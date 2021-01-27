import passport from 'passport';
import { saveUser, findOneUser } from '@src/repository/userRepository';

export const post_userService = (email, nickname, password) => {
  const createUser = saveUser(email, nickname, password);
  return createUser;
};

export const longin_userService = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(403).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = findOneUser(user);
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
};
