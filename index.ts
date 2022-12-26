import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { expressjwt } from "express-jwt";
import authRouter from './authRouter';
import postsRouter from './postsRouter';
import usersRouter from './usersRouter';
import { initDb } from './db';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  expressjwt({
    secret: "shhhhhhared-secret",
    algorithms: ["HS256"],
  }).unless({ path: ["/auth/login"] })
);
app.use(function (err: Error, req: Request, res: Response, next: any) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  } else {
    next(err);
  }
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

async function startApp() {
  try{
    await initDb ();
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startApp();