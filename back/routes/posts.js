const express = require('express');

const {Post, Image, User,Comment} = require('../models');

const router = express.Router();

router.get('/', async (req, res,next) => {

    try{
        const posts = await Post.findAll({
            //offset 은 단점이있음 
            limit: 10,
            order: [['createdAt', 'DESC'], [Comment, 'createdAt','DESC']],
            include: [{
                model: User,
                attributes:['id', 'nickname'],
            },{
                model: Image,
            },{
                model: Comment,
                include:[{
                    model: User,
                    attributes:['id', 'nickname'],
                }],
            },{
                model: User,
                as:'Likers',
                attributes:['id'],
            }],

        });
        res.status(200).json(posts);
    }catch(error) {
        console.log(error);
        next(error);
    }
    
})

module.exports = router;