import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();
let db = new sqlite3.Database('./db/data.db', (err) => {
  if(err) {
    console.log(err.message)
  };
  console.log('Connected to the database');
});

db.close((err) => {
  if(err) {
    console.log(err.message)
  };
  console.log('Database connection was closed');
})



dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});