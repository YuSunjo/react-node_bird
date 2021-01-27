import express from 'express';

const app: express.Application = express();

app.get('/ping', (req: express.Request, res: express.Response) => {
  res.status(200).send('pong');
});

export default app;
