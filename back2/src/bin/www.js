import dotenv from 'dotenv';

dotenv.config();

import app from '../app.js';
const port = process.env.PORT;

app.listen(port, (req, res) => {
    console.log(`express listening on port ${port}`);
})