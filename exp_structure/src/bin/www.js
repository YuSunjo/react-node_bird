import dotenv from 'dotenv';

dotenv.config();

import app from '@src/app.js';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`express listening on port ${port}`);
});
