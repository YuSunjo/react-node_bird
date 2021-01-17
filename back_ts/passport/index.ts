import * as passport from 'passport';
import User from '../models/user';

export default () => {
  //로그인할 때 한번
  passport.serializeUser(( user: User, done) => {
    done(null, user.id)
  });
  //매번
  passport.deserializeUser(async (id: number, done) => {
    try{
      const user = await User.findOne({
        where: { id },

      });
      return done(null, user)
    }catch(err) {

    }
  })
}