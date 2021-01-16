import express from 'express';

import admin from '@src/routes/admin/index';
import posts from '@src/routes/posts/index';
import userRouter from '@src/routes/user/index';

const router = express.Router();

router.use('/admin', admin);

router.use('/post', posts);

router.use('/user', userRouter);
export default router;
