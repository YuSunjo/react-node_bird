import User from '@src/models/user';
import db from '@src/models';

export const saveUser = (email, nickname, password) => {
  return User.create({
    email,
    nickname,
    password,
  });
};

export const findOneUser = async (user) => {
  return await User.findOne({
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
};
