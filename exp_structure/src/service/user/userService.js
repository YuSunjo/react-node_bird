import db from '@src/models';
import User from '@src/models/user';
import bcrypt from 'bcrypt';
import passport from 'passport';

export const post_userService = async (email, nickname, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await User.create({
    email,
    nickname,
    password: hashedPassword,
  });
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
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: db.Post,
          },
          {
            model: db.User,
            as: 'Followings',
          },
          {
            model: db.User,
            as: 'Followers',
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
};
