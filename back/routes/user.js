const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../models')
const passport = require('passport');

const router = express.Router();

//passport.authenticate는 req, res next를 쓸 수 없는데 아래처럼 쓰면 미들웨어를 확장시킬 수 있다. 
router.post('/login',(req,res, next) => {
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
            return res.json(user);
        })
    })(req, res, next);
});

router.post('/', async (req, res, next) => {
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

module.exports = router;