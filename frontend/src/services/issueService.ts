import axios from 'axios';

const API_URL = 'http://localhost:5002/api/issues'; // Ensure this matches your backend URL

export const getIssues = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addIssue = async (issue: { title: string; description: string }) => {
  const response = await axios.post(API_URL, issue);
  return response.data;
};

export const updateIssue = async (id: number, issue: { title: string; description: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, issue);
  return response.data;
};

export const deleteIssue = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
