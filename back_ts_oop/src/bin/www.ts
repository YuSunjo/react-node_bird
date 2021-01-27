import { App } from '@src/app';

try {
  const app = new App();
  const port: number = Number(process.env.PORT) || 8000;
  app.createExpressServer(port);
} catch (error) {
  console.error(error);
}
