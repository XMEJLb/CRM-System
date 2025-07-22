import { useEffect, useState } from 'react'

import type { Info, Todo } from '@/types/types'
import { getTodos } from '@/api/api'
import { AddTodo } from '@/components/AddTodo/AddTodo'

import { TodoList } from '@/components/TodoList/TodoList'
import { TabBar } from '@/components/TabBar/TabBar'

export const TodosPage = () => {
  const [arrFilter, setArrFilter] = useState<'all' | 'inWork' | 'completed'>(
    'all'
  )

  const [arrOfTodos, setArrOfTodos] = useState<Todo[]>([])

  const [info, setInfo] = useState<Info>({ all: 0, completed: 0, inWork: 0 })

  const updateTodosInfo = async () => {
    try {
      const result = await getTodos(arrFilter)
      if (result) {
        console.log(result.todos)
        setArrOfTodos(result.todos.reverse())
        setInfo(result.info)
      }
    } catch (error) {
      alert(`Возникла ошибка ${error}`)
    }
  }

  useEffect(() => {
    updateTodosInfo()
  }, [arrFilter])

  return (
    <>
      <h1>Ваши задачи</h1>
      <AddTodo updateTodosInfo={() => updateTodosInfo()} />
      <TabBar setArrFilter={setArrFilter} arrFilter={arrFilter} info={info} />
      <TodoList
        arrOfTodos={arrOfTodos}
        arrFilter={arrFilter}
        updateTodosInfo={() => updateTodosInfo()}
      />
    </>
  )
}
