import { Request, Response } from 'express';
import db from './db';
import validationErrors from './validationResult';

export const createPost = async (req: Request, res: Response) => {
  validationErrors(req, res);
  try {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    db.run(`INSERT INTO posts(title, content, author_id) VALUES(?, ?, ?)`, [title, content, author], function(err) {
      if (err) {
        throw err;
      }
      res.status(200).json({insertedId: this.lastID});
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  validationErrors(req, res);
  try {
    const id = req.params.id;
    db.get(`SELECT * FROM posts WHERE id=?`, id, (err, row) => {
      if (err) {
        throw err;
      }
      res.status(200).json(row);
    })
  } catch (e) {
    res.status(500).json(e);
  }
};