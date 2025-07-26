import { deleteTodo, putTodoIsDone, putTodoTitle } from '@/api/api'
import { useState } from 'react'
import styles from './TodoCard.module.css'
import penIcon from '@/assets/pen-icon.svg'
import binIcon from '@/assets/bin-icon.svg'
import checkIcon from '@/assets/check-icon.svg'
import crossIcon from '@/assets/cross-icon.svg'
import { ButtonIcon } from '@/UI/ButtonIcon/ButtonIcon'
import type { Todo } from '@/types/types'

interface TodoCardProps {
  todo: Todo
  updateTodos: () => Promise<void>
}

export const TodoCard = ({ todo, updateTodos }: TodoCardProps) => {
  const { title, id, isDone } = todo

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id)
      await updateTodos()
    } catch (error) {
      alert(`Возникла ошибка ${error}`)
    }
  }

  const updateTodoTittle = async (title: string, id: number) => {
    try {
      await putTodoTitle(title, id)
      await updateTodos()
    } catch (error) {
      alert(`Возникла ошибка ${error}`)
    }
  }

  const changeTodoIsDone = async (isDone: boolean, id: number) => {
    try {
      await putTodoIsDone(!isDone, id)
      await updateTodos()
    } catch (error) {
      alert(`Возникла ошибка ${error}`)
    }
  }

  const [inputValue, setInputValue] = useState<string>(title)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const [isEdit, setIsEdit] = useState<boolean>(true)

  const MIN_TODO_LENGTH = 2
  const MAX_TODO_LENGTH = 63

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const inputValueTrimmed = inputValue.trim()
    const length = inputValueTrimmed.length

    const isTooLong = length > MAX_TODO_LENGTH
    const isTooShort = length < MIN_TODO_LENGTH

    if (isTooLong || isTooShort) {
      alert(
        `Поле должно быть от ${MIN_TODO_LENGTH} до ${MAX_TODO_LENGTH} символов и не состоять только из пробелов`
      )
      return
    }

    try {
      await updateTodoTittle(inputValueTrimmed, id)
      setIsEdit(true)
      return
    } catch (error) {
      alert(`Возникла ошибка: ${(error as Error).message}`)
    }
  }

  const handleDeclineEdit = () => {
    setIsEdit(true)
    setInputValue(title)
  }

  return (
    <div className={styles.todoCard}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isDone}
        onChange={() => changeTodoIsDone(isDone, id)}
      />
      {isEdit && (
        <>
          <input
            type="text"
            minLength={2}
            maxLength={64}
            className={`${styles.input} ${isDone ? styles.checked : ''}`}
            value={inputValue}
            onChange={handleInputChange}
            disabled={isEdit}
          />
          <div className={styles.buttonsWrapper}>
            <ButtonIcon onClick={() => setIsEdit(false)} imgSrc={penIcon} />
            <ButtonIcon onClick={() => handleDelete(id)} imgSrc={binIcon} />
          </div>
        </>
      )}

      {!isEdit && (
        <form onSubmit={handleSave} className={styles.form}>
          <input
            type="text"
            minLength={2}
            maxLength={64}
            className={`${styles.input} ${isDone ? styles.checked : ''}`}
            value={inputValue}
            onChange={handleInputChange}
            disabled={isEdit}
          />
          <div className={styles.buttonsWrapper}>
            <ButtonIcon type="submit" imgSrc={checkIcon} />
            <ButtonIcon
              type="button"
              onClick={handleDeclineEdit}
              imgSrc={crossIcon}
            />
          </div>
        </form>
      )}
    </div>
  )
}
