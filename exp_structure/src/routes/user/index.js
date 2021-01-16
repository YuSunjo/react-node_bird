import express from 'express';
import { post_userController } from '@src/routes/user/user.ctrl';

const router = express.Router();

router.post('/', post_userController);

export default router;
