import { useEffect, useState } from 'react'

import type { Filter, Info, Todo } from '@/types/types'
import { getTodosMeta } from '@/api/api'
import { AddTodo } from '@/components/AddTodo/AddTodo'

import { TodoList } from '@/components/TodoList/TodoList'
import { TabBar } from '@/components/TabBar/TabBar'

export const TodosPage = () => {
  const [arrFilter, setArrFilter] = useState<Filter>('all')

  const [arrOfTodos, setArrOfTodos] = useState<Todo[]>([])

  const [info, setInfo] = useState<Info>({ all: 0, completed: 0, inWork: 0 })

  const updateTodos = async () => {
    try {
      const response = await getTodosMeta(arrFilter)
      if (!response) {
        throw new Error('Ошибка ответа сервера')
      }
      const { data, info } = response
      if (data && info) {
        setArrOfTodos(data.reverse())
        setInfo(info)
      } else {
        throw new Error('Неверные данные в ответе')
      }
    } catch (error) {
      alert(`Возникла ошибка ${error}`)
    }
  }

  useEffect(() => {
    updateTodos()
  }, [arrFilter])

  return (
    <>
      <AddTodo updateTodosInfo={updateTodos} />
      <TabBar setArrFilter={setArrFilter} arrFilter={arrFilter} info={info} />
      <TodoList arrOfTodos={arrOfTodos} updateTodos={updateTodos} />
    </>
  )
}
