import type { Todo, Info } from '../types/types'

export const getTodos = async (
  filter: 'all' | 'inWork' | 'completed'
): Promise<{ todos: Todo[]; info: Info } | undefined> => {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${filter}`
  )

  if (!response.ok) {
    throw new Error(`${response.status}`)
  }

  const { data, info } = await response.json()
  const todos = data

  return { todos, info }
}

export const postNewTodo = async (title: string) => {
  const response = await fetch('https://easydev.club/api/v1/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      isDone: false,
    }),
  })
  if (!response.ok) {
    throw new Error(`${response.status}`)
  }
}

export const deleteTodo = async (id: number) => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`${response.status}`)
  }
}

export const putTodoTitle = async (title: string, id: number) => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
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
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      isDone: !isDone,
    }),
  })
  if (!response.ok) {
    throw new Error(`${response.status}`)
  }
}
