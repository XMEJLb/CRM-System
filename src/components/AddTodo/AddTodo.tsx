import { useState } from 'react'

import styles from './AddTodo.module.css'
import { postNewTodo } from '@/api/api'
import { Button } from '@/UI/Button/Button'

interface AddTodoProps {
  updateTodosInfo: () => Promise<void>
}

export const AddTodo = ({ updateTodosInfo }: AddTodoProps) => {
  const [todo, setTodo] = useState<string>('')

  const MIN_TODO_LENGTH = 2
  const MAX_TODO_LENGTH = 63

  const handleInput = async (e: React.FormEvent) => {
    e.preventDefault()
    const todoTrimmed = todo.trim()

    const isTooShort = length < MIN_TODO_LENGTH
    const isTooLong = length > MAX_TODO_LENGTH

    if (isTooShort || isTooLong) {
      alert(
        `Поле должно быть от ${MIN_TODO_LENGTH} до ${MAX_TODO_LENGTH} символов и не состоять только из пробелов`
      )
      return
    }

    try {
      await postNewTodo(todoTrimmed)
      await updateTodosInfo()
      setTodo('')
    } catch (error) {
      alert(`Возникла ошибка: ${(error as Error).message}`)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  return (
    <form onSubmit={handleInput} className={styles.addtodo}>
      <input
        minLength={2}
        maxLength={64}
        value={todo}
        onChange={handleInputChange}
        className={styles.input}
        type="text"
      />
      <Button type="submit">Добавить</Button>
    </form>
  )
}
