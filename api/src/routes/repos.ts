import { Router, Request, Response } from 'express';
import {promises as fs} from 'fs';
import path from 'path';
import { AppError } from '../models/AppError';
import { Repo } from '../models/Repo';
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  // (A) 2. I wasn't sure if im suppose to join this two data source so I decided to
  // add a query flag that accepts a string value of: local
  // if source query isn't present just fetch github data

  const {
    query: { source },
  } = _;

  const getLocalData = async () => {
    let fileData: string | any[] = '';
    fileData = await fs.readFile(path.resolve('data', 'repos.json'), 'utf8');
    return JSON.parse(fileData);
  };

  const getGithubData = async () => {
    const { data } = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    return data;
  };

  let data: any = {};

  // determines the data source to use;
  try {
    if (source === 'github') {
      data = await getGithubData();
    } else {
      data = await getLocalData();
    }

    return res.json(data);
  } catch (err: any) {
    const error: AppError = new AppError(err.response.data.message, 500);
    return res.status(error.status).json(err.response.data);
  }
});
