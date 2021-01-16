import User from '@src/models/user';
import bcrypt from 'bcrypt';

export const post_userService = async (email, nickname, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await User.create({
    email,
    nickname,
    password: hashedPassword,
  });
  return createUser;
};
