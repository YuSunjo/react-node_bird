import { post_userService } from '@src/service/user/userService';

export const post_userController = async (req, res, next) => {
  const { email, nickname, password } = req.body;
  try {
    const singupUser = await post_userService(email, nickname, password);
    return res.status(200).json(singupUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
