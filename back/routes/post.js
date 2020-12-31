const express= require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {Post, Comment, Image, User, Hashtag, } = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

// try{
//     fs.accessSync('/uploads');
// }catch(error) {
//     console.log('uploads 폴더가 없으므로 생성합니다.');
//     fs.mkdirSync('uploads');
// }

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done){                             // 사진.png
            const ext = path.extname(file.originalname);       //확장자 추출(.png)
            const basename = path.basename(file.originalname, ext);
            done(null, basename + '_' + new Date().getTime() + ext);       //사진1010010.png  (시간까지 붙어서 나온다.)
        }
    }),
    limits: {fileSize: 20* 1024 * 1024},
});

router.post('/', isLoggedIn,upload.none(), async (req, res, next) => {
    try{
        const hashtags = req.body.content.match(/(#[^\s#]+)/g);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id
        });
        if(hashtags){
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where: {name: tag.slice(1).toLowerCase() },
            })));       //[[노드, true]] 이런식으로 되어 있음 
            await post.addHashtags(result.map((v) => v[0]));
        }
        if(req.body.image){
    //db에 이미지 파일을 올리지 않고 주소만 가지고 있음 db에 있으면 캐싱도 안됨  그리고 이미지는 s3 클라우드에 넣는다 
            if(Array.isArray(req.body.image)){     //이미지 여러개 올리면 image: [사진1.png 사진2.png]
                const images = await Promise.all(req.body.image.map((image) => Image.create({src: image})));
                await post.addImages(images);
            }else{                                  //이미지 하나만 올리면  image: 사진.png
                const image = await Image.create({src: req.body.image});
                await post.addImages(image);
            }
        }
        const fullPost = await Post.findOne({
            where: {id: post.id},
            include: [{
                model: Image,
            },{
                model: Comment,
                include:[{
                    model: User,          //댓글 작성자
                    attributes:['id', 'nickname'],
                }],
            },{
                model: User,             //게시글 작성자
                attributes:['id', 'nickname'],
            },{
                model: User, //좋아요 누르는 작성자
                as: 'Likers',
                attributes:['id'],
            }]
        })
        res.status(201).json(fullPost);
    }catch(error) {
        console.error(error);
        next(error);
    }
    
});

//upload.single none 
//이미지만 먼저 서버에 업로드 -> 미리보기나 리사이징 하기 위해
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
})

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
    try{
        const post = await Post.findOne({
            where: {id: req.params.postId},
            include:[{
                model:Post,
                as:'Retweet',
            }],
        });
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        if(req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)){
            return res.status(403).send('자신의 글을 리트윗할 수 없습니다.');
        }
        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId,
            }
        });
        if(exPost) {
            return res.status(403).send('이미 리트윗했습니다.');
        }
        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet'
        });
        const retweetWithPrevPost = await Post.findOne({
            where: {id: retweet.id},
            include:[{
                model: Post,
                as: 'Retweet',
                include:[{
                    model: User,
                    attributes: ['id', 'nickname'],
                },{
                    model: Image,
                }]
            },{
                model: User,
                attributes:['id', 'nickname'],
            },{
                model:Image,
            },{
                //comment같은것은 분리할 수 있으면 분리 
                model:Comment,
                include:[{
                    model: User,
                    attributes:['id', 'nickname'],
                },{
                    model:User,
                    as:'Likers',
                    attributes: ['id'],
                }],
            }],
        })
        
        res.status(201).json(retweetWithPrevPost);
    }catch(error) {
        console.error(error);
        next(error);
    }
    
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try{
        const post = await Post.findOne({
            where: {id: req.params.postId}
        });
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId,10),
            UserId : req.user.id                       //passport에서 deserialize에 저장되어 있음
        })
        const fullComment = await Comment.findOne({
            where: {id: comment.id},
            include: [{
                model: User,
                attributes:['id', 'nickname'],
            }]
        })
        res.status(201).json(fullComment);
    }catch(error) {
        console.error(error);
        next(error);
    }
    
});

router.patch('/:postId/like',isLoggedIn, async (req, res,next) => {
    try{
        const post = await Post.findOne({where: {id: req.params.postId}});
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        res.json({PostId: post.id, UserId: req.user.id});
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.delete('/:postId/like',isLoggedIn, async (req, res,next) => {
    try{
        const post = await Post.findOne({where: {id: req.params.postId}});
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({PostId: post.id, UserId: req.user.id});
    }catch(error){
        console.log(error);
        next(error);
    }
})

router.delete('/:postId',isLoggedIn, async (req, res , next) => {
    try{
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id,
            },
        });
        res.status(200).json({PostId: parseInt(req.params.postId)});
    }catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;