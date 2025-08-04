import type { Todo, Info, Filter, MetaResponse } from '../types/types'

const API_URL = 'https://easydev.club/api/v1/todos'

export const getTodosMeta = async (
  filter: Filter
): Promise<MetaResponse<Todo, Info>> => {
  const response = await fetch(`${API_URL}?filter=${filter}`)

  if (!response.ok) {
    throw new Error(`${response.status}`)
  }

  const { data, info, meta } = await response.json()

  return { data, info, meta }
}

export const postNewTodo = async (title: string, isDone: boolean) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      isDone: isDone,
    }),
  })
  if (!response.ok) {
    throw new Error(`${response.status}`)
  }
}

export const deleteTodo = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`${response.status}`)
  }
}

export const putTodoTitle = async (title: string, id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: title,
    }),
  })
  if (!response.ok) {
    throw new Error(`${response.status}`)
  }
}

export const putTodoIsDone = async (isDone: boolean, id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      isDone: isDone,
    }),
  })
  if (!response.ok) {
    throw new Error(`${response.status}`)
  }
}
