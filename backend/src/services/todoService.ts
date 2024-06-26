import Todo, { ITodo } from '../models/todoModel';

export const getTodos = async (): Promise<ITodo[]> => {
  return Todo.find();
};

export const createTodo = async (title: string, description: string, status: string): Promise<ITodo> => {
  const newTodo = new Todo({ title, description, status });
  return newTodo.save();
};

export const deleteTodo = async (id: string): Promise<ITodo | null> => {
  return Todo.findByIdAndDelete(id);
};

export const updateTodo = async (id: string, title: string, description: string, status: string): Promise<ITodo | null> => {
  return Todo.findByIdAndUpdate(id, { title, description, status }, { new: true });
};
