import { Request, Response } from 'express';
import TodoService from '../services/todoService';

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await TodoService.getTodos();
    res.json(todos);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const newTodo = await TodoService.addTodo(title, description, status);
    res.json(newTodo);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    await TodoService.deleteTodo(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const updatedTodo = await TodoService.updateTodo(req.params.id, title, description, status);
    res.json(updatedTodo);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};
