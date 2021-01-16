import passport from 'passport';
import local from './local';
import User from '@src/models/user';

export default () => {
  passport.serializeUser((user, done) => {
    done(user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
