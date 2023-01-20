import { Router, Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { AppError } from '../models/AppError';
import { Repo } from '../models/Repo';
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

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

  // Aggregate data from both sources.
  try {
    const localData: [] = await getLocalData();
    const githubData: [] = await getGithubData();
    let aggregatedData: Repo[] = localData.concat(githubData);

    // Filter through data only retuning if fork has a boolean value of false;
    aggregatedData = aggregatedData.filter(
      (repository: any) => !repository.fork
    );

    return res.json(aggregatedData);
  } catch (err: any) {
    const error: AppError = new AppError(err.response.data.message, 500);
    return res.status(error.status).json(err.response.data);
  }
});
