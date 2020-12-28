const express = require('express');
const bcrypt = require('bcrypt');
const {User ,Post} = require('../models')
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')

const router = express.Router();

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
                },{
                    model: User,
                    as: 'Followings',
                },{
                    model: User,
                    as: 'Followers',
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

module.exports = router;