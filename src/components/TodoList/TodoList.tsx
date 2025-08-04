import type { Filter, Todo } from '@/types/types'
import styles from './TodoList.module.css'
import { TodoCard } from '@components/TodoCard/TodoCard'

interface TodoListProps {
  arrOfTodos: Todo[]
  arrFilter: Filter
  updateTodos: () => Promise<void>
}

export const TodoList = ({
  arrOfTodos,
  arrFilter,
  updateTodos,
}: TodoListProps) => {
  return (
    <div className={styles.todolist}>
      {!arrOfTodos.length && 'Нет задач'}
      {arrFilter === 'all' &&
        arrOfTodos.map((el) => (
          <TodoCard key={el.id} todo={el} updateTodos={updateTodos} />
        ))}
      {arrFilter === 'inWork' &&
        arrOfTodos
          .filter((el) => el.isDone === false)
          .map((el) => (
            <TodoCard key={el.id} todo={el} updateTodos={updateTodos} />
          ))}
      {arrFilter === 'completed' &&
        arrOfTodos
          .filter((el) => el.isDone === true)
          .map((el) => (
            <TodoCard key={el.id} todo={el} updateTodos={updateTodos} />
          ))}
    </div>
  )
}
