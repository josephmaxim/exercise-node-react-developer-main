import { Router, Request, Response } from 'express';
import { AppError } from '../models/AppError';
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  try {
    const { data } = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    return res.json(data);
  } catch (err: any) {
    const error: AppError = new AppError(err.response.data.message, 500);
    return res.status(error.status).json(err.response.data);
  }
});
