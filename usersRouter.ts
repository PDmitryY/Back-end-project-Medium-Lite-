import { Router } from "express";
import { param, query } from 'express-validator';
import { getAllUsers, getUserPostsById } from "./usersController";

const usersRouter = Router();

usersRouter.get('/:id/posts', 
  param('id').isNumeric(),
  query('limit').isNumeric(),
  query('page').isNumeric(),
  getUserPostsById);

usersRouter.get('/', 
  query('limit').isNumeric(),
  query('page').isNumeric(),
  getAllUsers);

export default usersRouter;