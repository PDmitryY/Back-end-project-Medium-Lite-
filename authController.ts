import jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import crypto from 'crypto';
import db from './db';
import validationErrors from "./validationResult";

const jwtKey = 'shhhhhhared-secret';
const jwtExpirySeconds = 300;
const salt = 'ksgdkfb';

export const login = async (req: Request, res: Response) => {
  validationErrors(req, res);
  const { username, password } = req.body;
  const hashedPassword = crypto.pbkdf2Sync(password,  
    salt, 1000, 64, 'sha512').toString('hex');

    db.all(`SELECT * FROM users`, (err, rows) => {
    })
    db.get(`SELECT * FROM users WHERE email=? AND password=?`, [username, hashedPassword], (err, row) => {
      if (err) {
        throw err;
      }
      if(row) {
        const token = jwt.sign({ username }, jwtKey, {
          algorithm: 'HS256',
          expiresIn: jwtExpirySeconds
        })
      
        res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
        res.end()
      } else {
        return res.status(401).end('fail')
      }
    });

}

export const logout = async (req: Request, res: Response) => {
  res.cookie('token', '', { maxAge: 0 })
  res.end()
}