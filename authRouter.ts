import { Router } from "express";
import { body } from "express-validator";
import { logout, login } from './authController';

const authRouter = Router();

authRouter.post('/login',
  body('username').isEmail(),
  body('password').isLength({ min: 5 }),
  login);
authRouter.get('/logout', logout);


export default authRouter;