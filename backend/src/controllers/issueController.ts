import { Request, Response } from 'express';
import issues from '../services/issueService';
import Issue from '../models/issue';

export const getIssues = (req: Request, res: Response) => {
  res.json(issues);
};

export const createIssue = (req: Request, res: Response) => {
  const newIssue: Issue = req.body;
  issues.push(newIssue);
  res.status(201).json(newIssue);
};

export const updateIssue = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedIssue: Issue = req.body;
  const index = issues.findIndex(issue => issue.id === parseInt(id));

  if (index !== -1) {
    issues[index] = updatedIssue;
    res.json(updatedIssue);
  } else {
    res.status(404).send('Issue not found');
  }
};

export const deleteIssue = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = issues.findIndex(issue => issue.id === parseInt(id));

  if (index !== -1) {
    const deletedIssue = issues.splice(index, 1);
    res.json(deletedIssue);
  } else {
    res.status(404).send('Issue not found');
  }
};
