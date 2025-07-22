import { useState } from 'react'

import styles from './AddTodo.module.css'
import { postNewTodo } from '@/api/api'
import { Button } from '@/UI/Button/Button'

interface AddTodoProps {
  updateTodosInfo: () => Promise<void>
}

export const AddTodo = ({ updateTodosInfo }: AddTodoProps) => {
  const [todo, setTodo] = useState('')

  const handleInput = async (e: React.FormEvent) => {
    e.preventDefault()
    const todoTrimmed = todo.trim()

    if (todoTrimmed.length > 2 && todoTrimmed.length < 64) {
      try {
        await postNewTodo(todoTrimmed)
        await updateTodosInfo()
        setTodo('')
        return
      } catch (error) {
        alert(`Возникла ошибка ${error}`)
      }
    }

    alert(
      'Поле должно быть от 2 до 64 символов и не состоять только из пробелов'
    )
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
