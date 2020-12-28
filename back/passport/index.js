const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

//passport가 다 들고 있기는 너무 무거워서 id만 들고있고 그 id 로 db에서 정보들을 찾는다. 

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        try{
            const user = await User.findOne({where : { id }});
            done(null, user);               //req.user에 정보가 있음 
        }catch(error){
            console.error(error);
            done(error);
        }
        
    });

    local();
}