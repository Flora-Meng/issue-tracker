import { Request, Response } from 'express';
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from '../services/todoService';

// get all Todos
export const getTodosController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const todos = await getTodos();
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// create a Todo
export const createTodoController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .send({ message: 'Title and description are required' });
    }

    const newTodo = await createTodo(title, description, status);
    console.log('Created:', newTodo);
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).send({ error: (error as Error).message });
  }
};

// update a Todo
export const updateTodoController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .send({ message: 'Title and description are required' });
    }

    const updatedTodo = await updateTodo(
      req.params.id,
      title,
      description,
      status,
    );
    if (!updatedTodo) {
      return res.status(404).send({ error: 'Todo not found' });
    }
    console.log('Updated:', updatedTodo);
    return res.json(updatedTodo);
  } catch (error) {
    return res.status(500).send({ error: (error as Error).message });
  }
};

// Delete a Todo
export const deleteTodoController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const deletedTodo = await deleteTodo(req.params.id);
    if (!deletedTodo) {
      return res.status(404).send({ error: 'Todo not found' });
    }
    console.log('Deleted:', req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send({ error: (error as Error).message });
  }
};
