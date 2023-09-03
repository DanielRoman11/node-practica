import express from 'express';
import { route } from './routes/user.routes.js';
import { db } from './config/db.js';

const app = express();

try {
  await db.authenticate();
  await db.sync();
  console.log("Connection to DB 🙆");
} catch (error) {
  console.error('Unable to connect to database: ', error);
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.set('view engine', 'pug');
app.set('views', '/views');

app.use('/auth', route)

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App listen on port: ${port}`);
});
