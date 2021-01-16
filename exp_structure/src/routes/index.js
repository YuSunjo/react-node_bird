import express from 'express';

import admin from '@src/routes/admin/index';
import posts from '@src/routes/posts/index';

const router = express.Router();

router.use('/admin', admin);

router.use('/posts', posts);

export default router;
