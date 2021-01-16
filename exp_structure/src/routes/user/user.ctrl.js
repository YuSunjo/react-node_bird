import {
  post_userService,
  longin_userService,
} from '@src/service/user/userService';

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

export const loginController = (req, res, next) => {
  longin_userService(req, res, next);
};

export const logoutController = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
};
