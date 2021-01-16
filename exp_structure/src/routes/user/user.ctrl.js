import User from '@src/models/user';
import bcrypt from 'bcrypt';

export const post_userController = async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;
    const exUser = await User.findOne({
      where: {
        email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      nickname,
      password: hashedPassword,
    });
    res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
};
