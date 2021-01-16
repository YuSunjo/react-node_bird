import express from 'express';

import admin from '@src/routes/admin/index';

const router = express.Router();

router.use('/admin', admin);

export default router;
