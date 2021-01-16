import User from '@src/models/user';

export const saveUser = async (email, nickname, password) => {
  return await User.create({
    email,
    nickname,
    password,
  });
};
