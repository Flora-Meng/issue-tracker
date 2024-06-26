import Todo, { ITodo } from '../models/todoModel';

class TodoService {
  public async getTodos(): Promise<ITodo[]> {
    return Todo.find();
  }

  public async addTodo(title: string, description: string, status: string): Promise<ITodo> {
    const newTodo = new Todo({ title, description, status });
    return newTodo.save();
  }

  public async deleteTodo(id: string): Promise<void> {
    await Todo.findByIdAndDelete(id);
  }

  public async updateTodo(id: string, title: string, description: string, status: string): Promise<ITodo | null> {
    return Todo.findByIdAndUpdate(id, { title, description, status }, { new: true });
  }
}

export default new TodoService();
