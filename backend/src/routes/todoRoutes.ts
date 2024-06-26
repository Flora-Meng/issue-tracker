import { Router } from 'express';
import { getTodosController, createTodoController, deleteTodoController, updateTodoController } from '../controllers/todoController';

const router = Router();

router.get('/', getTodosController); 
router.post('/', createTodoController); 
router.delete('/:id', deleteTodoController); 
router.put('/:id', updateTodoController);

export default router;