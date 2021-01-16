import express from 'express';

const router = express.Router();
import { get_post } from '@src/routes/posts/posts.ctrl';

router.get('/', (req, res) => {
  res.send('post page');
});

router.get('/ping', get_post);

export default router;
