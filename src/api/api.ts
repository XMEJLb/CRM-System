import axios from 'axios';
import type { Todo, Info, Filter, MetaResponse } from '../types/types';

const API_URL = 'https://easydev.club/api/v1/todos';

export const getTodosMeta = async (
  filter: Filter
): Promise<MetaResponse<Todo, Info>> => {
  const response = await axios.get(`${API_URL}?filter=${filter}`);

  const { data, info, meta } = response.data;

  return { data, info, meta };
};

export const postNewTodo = async (title: string, isDone: boolean) => {
  return axios.post(`${API_URL}`, {
    title: title,
    isDone: isDone,
  });
};

export const deleteTodo = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const putTodoTitle = async (title: string, id: number) => {
  return axios.put(`${API_URL}/${id}`, {
    title: title,
  });
};

export const putTodoIsDone = async (isDone: boolean, id: number) => {
  return axios.put(`${API_URL}/${id}`, {
    isDone: isDone,
  });
};
