import app from '@src/app';

const port: number = Number(process.env.PORT) || 8000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
