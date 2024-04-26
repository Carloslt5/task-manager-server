import app from './app';
import { connectDataBase } from './db';

const PORT = process.env.PORT ?? 5005;

new Promise((resolve) => resolve(connectDataBase()))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on ----------> http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(`Error : ${err}`));
