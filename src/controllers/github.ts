import * as githubService from '../services/github';
import { Request, Response } from 'express';

export const HandleGetUsers = async (req: Request, res: Response) => {
  const { searchTerm, page, perPage, sort, order } = req.query;
  try {
    const svcResult = await githubService.searchUsers({
      searchTerm: searchTerm as string,
      page: page as unknown as number,
      perPage: perPage as unknown as number,
      sort: sort as string,
      order: order as 'asc' | 'desc',
    });
    return res.status(200).send({
      total_count: svcResult.result.total_count,
      incomplete_results: svcResult.result.incomplete_results,
      items: svcResult.refinedItems,
    });
  } catch (e: any) {
    console.log(e.response);
    return res.status(500).send({ message: 'An error occurred' });
  }
};

export async function getGitHubUsername(req: Request, res: Response): Promise<any> {
  try {
    const username = req.params.username;
    const result = await githubService.getGitHubUsername({ username });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

export async function getGitHubRepositories(req: Request, res: Response): Promise<any> {
  try {
    const { owner, repo } = req.params;
    const result = await githubService.getGitHubRepositories({ owner, repo }); 
    return res.status(200).send({ languages: Object.keys(result) });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};
