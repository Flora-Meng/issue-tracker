import api from './api';

export const createTodo = async (
  title: string,
  description: string,
  status: string,
) => {
  try {
    await api.post('/todos', { title, description, status });
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (
  id: string,
  title: string,
  description: string,
  status: string,
) => {
  try {
    await api.put(`/todos/${id}`, { title, description, status });
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    throw error;
  }
};

export const fetchTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data;
  } catch (error) {
    throw error;
  }
};
