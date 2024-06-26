import { Router } from 'express';
import { getIssues, createIssue, updateIssue, deleteIssue } from '../controllers/issueController';

const router = Router();

router.get('/', getIssues);
router.post('/', createIssue);
router.put('/:id', updateIssue);
router.delete('/:id', deleteIssue);

export default router;
