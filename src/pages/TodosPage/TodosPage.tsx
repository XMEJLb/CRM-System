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
      const { data, info } = await getTodosMeta(arrFilter)
      if (data && info) {
        console.log(data, info)
        setArrOfTodos(data.reverse())
        setInfo(info)
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
      <h1>Ваши задачи</h1>
      <AddTodo updateTodosInfo={updateTodos} />
      <TabBar setArrFilter={setArrFilter} arrFilter={arrFilter} info={info} />
      <TodoList
        arrOfTodos={arrOfTodos}
        arrFilter={arrFilter}
        updateTodos={updateTodos}
      />
    </>
  )
}
