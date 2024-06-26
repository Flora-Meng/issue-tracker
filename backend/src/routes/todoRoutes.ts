// import { Router } from 'express';
// import { getTodos, addTodo, deleteTodo, updateTodo } from '../controllers/todoController';

// const router = Router();

// router.get('/todos', getTodos);
// router.post('/todos', addTodo);
// router.delete('/todos/:id', deleteTodo);
// router.put('/todos/:id', updateTodo);

// export default router;


import { Router } from 'express';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../controllers/todoController';

const router = Router();

router.get('/', getTodos);  // GET /todos
router.post('/', addTodo);  // POST /todos
router.delete('/:id', deleteTodo);  // DELETE /todos/:id
router.put('/:id', updateTodo);  // PUT /todos/:id

export default router;
