import { Router } from "express";
import { createPost, getPostById } from "./postsController";
import { param, query } from 'express-validator';

const postsRouter = Router();

postsRouter.post('/', 
  param('title').isString,
  param('content').isString,
  param('author').isNumeric,
  createPost);
postsRouter.get('/:id', 
  param('id').isNumeric(),
  getPostById);

export default postsRouter;