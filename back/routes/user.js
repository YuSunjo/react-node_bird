const express = require('express');
const bcrypt = require('bcrypt');
const {User ,Post} = require('../models')
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')

const router = express.Router();

router.get('/',async (req, res, next) => {
    //쿠키는 해더에 있음
    console.log(req.headers);
    try{
        if(req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: {id: req.user.id}, 
                attributes:{
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                },{
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                },{
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            res.status(200).json(fullUserWithoutPassword);
        }else {
            res.status(200).json(null);
        } 
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/:userId',async (req, res, next) => {
    try{
        const fullUserWithoutPassword = await User.findOne({
            where: {id: req.params.userId}, 
            attributes:{
                exclude: ['password']
            },
            include: [{
                model: Post,
                attributes: ['id'],
            },{
                model: User,
                as: 'Followings',
                attributes: ['id'],
            },{
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        })
        if(fullUserWithoutPassword){
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length;                  //개인정보 침해 예방
            data.Followers = data.Followers.length;
            data.Followings = data.Followings.length;
            res.status(200).json(data);
        }else {
            res.status(404).json('존재하지 않는 사용자입니다.');
        } 
    }catch(error){
        console.error(error);
        next(error);
    }
})

//passport.authenticate는 req, res next를 쓸 수 없는데 아래처럼 쓰면 미들웨어를 확장시킬 수 있다. 
router.post('/login', isNotLoggedIn,(req,res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.error(err);
            return next(err);
        }
        if(info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr) => {
            if(loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            //user에서 팔로잉 포스트 이런것은 없고 비밀번호는 있는 상태 
            //attributes: ['id', 'nickname', 'email'] 처럼 받을 것을 써도 되고
            const fullUserWithoutPassword = await User.findOne({
                where: {id: user.id}, 
                attributes:{
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                },{
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                },{
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req, res, next);
});

router.post('/',isNotLoggedIn, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if(exUser) {
            return res.status(403).send('이미 사용중인 아이디 입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({                  //원래 비동기여서 밑에 res.json으로 바로 가게됨 그래서 async await 넣어줌
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('ok');
    } catch (error) {
        console.error(error);
        next(error)             //status 500
    }
})

router.post('/logout',isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

router.patch('/nickname', isLoggedIn,async(req,res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname,
        },{
            where: {id: req.user.id},
        });
        res.status(200).json({nickname: req.body.nickname});
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.patch('/:userId/follow', isLoggedIn,async(req,res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.userId}});
        if(!user){
            res.status(403).send('없는 사람을 팔로우하려고 합니다.');
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId,10)});
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.delete('/:userId/follow', isLoggedIn,async(req,res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.userId}});
        if(!user){
            res.status(403).send('없는 사람을 언팔로우하려고 합니다.');
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId,10)});
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/followers', isLoggedIn,async(req,res, next) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}});
        if(!user){
            res.status(403).send('없는 사람을 팔로우하려고 합니다.');
        }
        const followers = await user.getFollowers();
        res.status(200).json(followers);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/followings', isLoggedIn,async(req,res, next) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}});
        if(!user){
            res.status(403).send('없는 사람을 팔로우하려고 합니다.');
        }
        const followings = await user.getFollowings();
        res.status(200).json(followings);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.delete('/follower/:userId', isLoggedIn,async(req,res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.userId}});
        if(!user){
            res.status(403).send('없는 사람을 차단하려고 합니다.');
        }
        await user.removeFollowings(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId,10)});
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;