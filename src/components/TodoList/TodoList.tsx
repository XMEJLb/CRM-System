import styles from './TodoList.module.css';
import { TodoCard } from '../../components/TodoCard/TodoCard';
import type { TodoListProps } from './TodoList.props';

export const TodoList = ({
  arrOfTodos,
  arrFilter,
  fetchAllTodos,
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
            fetchAllTodos={fetchAllTodos}
          >
            {el.title}
          </TodoCard>
        ))}
      {arrFilter === 'inWork' &&
        arrOfTodos
          .filter((el) => el.isDone === false)
          .map((el) => (
            <TodoCard
              key={el.id}
              id={el.id}
              isDone={el.isDone}
              fetchAllTodos={fetchAllTodos}
            >
              {el.title}
            </TodoCard>
          ))}
      {arrFilter === 'completed' &&
        arrOfTodos
          .filter((el) => el.isDone === true)
          .map((el) => (
            <TodoCard
              key={el.id}
              id={el.id}
              isDone={el.isDone}
              fetchAllTodos={fetchAllTodos}
            >
              {el.title}
            </TodoCard>
          ))}
    </div>
  );
};
