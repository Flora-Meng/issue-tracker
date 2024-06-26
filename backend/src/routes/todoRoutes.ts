import { Router } from 'express';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../controllers/todoController';

const router = Router();

router.get('/todos', getTodos);
router.post('/todos', addTodo);
router.delete('/todos/:id', deleteTodo);
router.put('/todos/:id', updateTodo);

export default router;
