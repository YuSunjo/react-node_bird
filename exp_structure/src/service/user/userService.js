import bcrypt from 'bcrypt';
import passport from 'passport';
import { saveUser, findOneUser } from '@src/repository/userRepository';

export const post_userService = async (email, nickname, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = saveUser(email, nickname, hashedPassword);
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
