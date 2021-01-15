import express from 'express';
import { get_pong } from './admin.ctrl.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin page');
});

router.get('/ping', get_pong);

export default router;

