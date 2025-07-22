import { deleteTodo, putTodoIsDone, putTodoTitle } from '@/api/api'
import { useState } from 'react'
import styles from './TodoCard.module.css'
import binIcon from '@assets/bin-icon.svg'
import penIcon from '@assets/pen-icon.svg'
import checkIcon from '@assets/check-icon.svg'
import crossIcon from '@assets/cross-icon.svg'
import { ButtonIcon } from '@/UI/ButtonIcon/ButtonIcon'

interface TodoCardProps {
  title: string
  id: number
  isDone: boolean
  updateTodosInfo: () => Promise<void>
}

export const TodoCard = ({
  title,
  id,
  isDone,
  updateTodosInfo,
}: TodoCardProps) => {
  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id)
      await updateTodosInfo()
    } catch (error) {
      alert(`Возникла ошибка ${error}`)
    }
  }

  const updateTodoTittle = async (title: string, id: number) => {
    try {
      await putTodoTitle(title, id)
      await updateTodosInfo()
    } catch (error) {
      alert(`Возникла ошибка ${error}`)
    }
  }

  const changeTodoIsDone = async (isDone: boolean, id: number) => {
    try {
      await putTodoIsDone(isDone, id)
      await updateTodosInfo()
    } catch (error) {
      alert(`Возникла ошибка ${error}`)
    }
  }

  const [inputValue, setInputValue] = useState<string>(title)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const [isEdit, setIsEdit] = useState<boolean>(true)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const inputValueTrimmed = inputValue.trim()
    if (inputValueTrimmed.length > 2 && inputValueTrimmed.length < 64) {
      await updateTodoTittle(inputValueTrimmed, id)
      setIsEdit(true)
      return
    }
    alert('Поле должно быть от 2 до 64 символов и не состоять из пробелов')
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
            <ButtonIcon onClick={() => setIsEdit(false)} src={penIcon} />
            <ButtonIcon onClick={() => handleDelete(id)} src={binIcon} />
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
            <ButtonIcon type="submit" src={checkIcon} />
            <ButtonIcon
              type="button"
              onClick={handleDeclineEdit}
              src={crossIcon}
            />
          </div>
        </form>
      )}
    </div>
  )
}
