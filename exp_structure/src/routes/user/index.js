import express from 'express';
import {
  post_userController,
  loginController,
  logoutController,
} from '@src/routes/user/user.ctrl';

const router = express.Router();

router.post('/', post_userController);

router.post('/login', loginController);

router.post('/logout', logoutController);

export default router;
