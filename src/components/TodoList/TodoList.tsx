import type { Todo } from '@/types/types'
import styles from './TodoList.module.css'
import { TodoCard } from '@components/TodoCard/TodoCard'

interface TodoListProps {
  arrOfTodos: Todo[]
  arrFilter: 'all' | 'inWork' | 'completed'
  updateTodosInfo: () => Promise<void>
}

export const TodoList = ({
  arrOfTodos,
  arrFilter,
  updateTodosInfo,
}: TodoListProps) => {
  return (
    <div className={styles.todolist}>
      {!arrOfTodos.length && 'Нет задач'}
      {arrFilter === 'all' &&
        arrOfTodos.map((el) => (
          <TodoCard
            key={el.id}
            id={el.id}
            isDone={el.isDone}
            updateTodosInfo={updateTodosInfo}
            title={el.title}
          />
        ))}
      {arrFilter === 'inWork' &&
        arrOfTodos
          .filter((el) => el.isDone === false)
          .map((el) => (
            <TodoCard
              key={el.id}
              id={el.id}
              isDone={el.isDone}
              updateTodosInfo={updateTodosInfo}
              title={el.title}
            />
          ))}
      {arrFilter === 'completed' &&
        arrOfTodos
          .filter((el) => el.isDone === true)
          .map((el) => (
            <TodoCard
              key={el.id}
              id={el.id}
              isDone={el.isDone}
              updateTodosInfo={updateTodosInfo}
              title={el.title}
            />
          ))}
    </div>
  )
}
