import type { Todo, Info, Filter, MetaResponse } from '../types/types'
import { api } from './axios'

export const getTodosMeta = async (
  filter: Filter
): Promise<MetaResponse<Todo, Info>> => {
  const response = await api.get('/todos', { params: { filter } })

  return response.data
}

export const postNewTodo = async (title: string) => {
  return api.post('/todos', {
    title: title,
    isDone: false,
  })
}

export const deleteTodo = async (id: number) => {
  return api.delete(`/todos/${id}`)
}

export const putTodoTitle = async (title: string, id: number) => {
  return api.put(`$/todos/${id}`, {
    title: title,
  })
}

export const putTodoIsDone = async (isDone: boolean, id: number) => {
  return api.put(`/todos/${id}`, {
    isDone: isDone,
  })
}
