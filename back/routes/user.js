const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../models')
const router = express.Router();

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