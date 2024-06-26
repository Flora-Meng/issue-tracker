import Todo from '../models/todoModel';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../services/todoService';
import { Document } from 'mongoose';

// ITodo interface
interface ITodo extends Document {
  id: string;
  title: string;
  description: string;
  status: string;
}

jest.mock('../models/todoModel');

describe('Todo Service', () => {
  describe('getTodos', () => {
    it('should return all todos', async () => {
      const todos: ITodo[] = [
        { id: '1', title: 'Test Todo', description: 'Test', status: 'pending' } as ITodo
      ];
      (Todo.find as jest.Mock).mockResolvedValue(todos);

      const result = await getTodos();

      expect(result).toEqual(todos);
      expect(Todo.find).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      (Todo.find as jest.Mock).mockRejectedValue(new Error('Something went wrong'));

      await expect(getTodos()).rejects.toThrow('Something went wrong');
      expect(Todo.find).toHaveBeenCalled();
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const newTodo = { id: '1', title: 'Test Todo', description: 'Test', status: 'pending' } as ITodo;
      (Todo.prototype.save as jest.Mock).mockResolvedValue(newTodo);

      const result = await createTodo('Test Todo', 'Test', 'pending');

      expect(result).toEqual(newTodo);
      expect(Todo.prototype.save).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      (Todo.prototype.save as jest.Mock).mockRejectedValue(new Error('Something went wrong'));

      await expect(createTodo('Test Todo', 'Test', 'pending')).rejects.toThrow('Something went wrong');
      expect(Todo.prototype.save).toHaveBeenCalled();
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const todo: ITodo | null = { id: '1', title: 'Test Todo', description: 'Test', status: 'pending' } as ITodo;
      (Todo.findByIdAndDelete as jest.Mock).mockResolvedValue(todo);

      const result = await deleteTodo('1');

      expect(result).toEqual(todo);
      expect(Todo.findByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('should handle errors', async () => {
      (Todo.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Something went wrong'));

      await expect(deleteTodo('1')).rejects.toThrow('Something went wrong');
      expect(Todo.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', async () => {
      const updatedTodo: ITodo | null = { id: '1', title: 'Updated Todo', description: 'Updated', status: 'completed' } as ITodo;
      (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedTodo);

      const result = await updateTodo('1', 'Updated Todo', 'Updated', 'completed');

      expect(result).toEqual(updatedTodo);
      expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith('1', { title: 'Updated Todo', description: 'Updated', status: 'completed' }, { new: true });
    });

    it('should handle errors', async () => {
      (Todo.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Something went wrong'));

      await expect(updateTodo('1', 'Updated Todo', 'Updated', 'completed')).rejects.toThrow('Something went wrong');
      expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith('1', { title: 'Updated Todo', description: 'Updated', status: 'completed' }, { new: true });
    });
  });
});
