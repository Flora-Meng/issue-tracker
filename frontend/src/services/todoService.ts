import api from './api';

export const saveTodo = async (
  todo: { _id: string; title: string; description: string; status: string } | null,
  title: string,
  description: string,
  status: string
) => {
  try {
    if (todo) {
      await api.put(`/todos/update/${todo._id}`, { title, description, status });
    } else {
      await api.post('/todos/add', { title, description, status });
    }
  } catch (error) {
    console.error('Failed to save todo', error);
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  await api.delete(`/todos/${id}`);
};

export const fetchTodos = async () => {
    const response = await api.get('/todos');
    return response.data;
  };