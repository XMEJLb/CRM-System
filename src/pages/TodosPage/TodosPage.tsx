import { useEffect, useState } from 'react';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import styles from './TodosPage.module.css';
import { DisplaySwitcher } from '../../components/DisplaySwitcher/DisplaySwitcher';
import { TodoCard } from '../../components/TodoCard/TodoCard';

export const TodosPage = () => {
  const fetchAllTodos = async () => {
    const response = await fetch(
      'https://easydev.club/api/v1/todos?filter=all'
    );
    const { data } = await response.json();
    console.log([...data].reverse());

    setArrOfTodos([...data].reverse());
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const [arrOfTodos, setArrOfTodos] = useState<
    {
      id: number;
      title: string;
      created: string;
      isDone: boolean;
    }[]
  >([]);

  const [arrFilter, setArrFilter] = useState<'all' | 'inWork' | 'completed'>(
    'all'
  );

  return (
    <>
      <h1>Ваши задачи</h1>
      <AddTodo fetchAllTodos={fetchAllTodos} />
      <div className={styles.displaySwitcherWrapper}>
        <DisplaySwitcher
          isDisabled={arrFilter === 'all'}
          text={'Все'}
          count={arrOfTodos.length}
          setArrFilter={() => {
            fetchAllTodos();
            setArrFilter('all');
          }}
        />
        <DisplaySwitcher
          text={'Активные'}
          isDisabled={arrFilter === 'inWork'}
          setArrFilter={() => {
            fetchAllTodos();
            setArrFilter('inWork');
          }}
          count={arrOfTodos.reduce(
            (acc, el) => (!el.isDone ? acc + 1 : acc),
            0
          )}
        />
        <DisplaySwitcher
          text={'Завершенные'}
          isDisabled={arrFilter === 'completed'}
          setArrFilter={() => {
            fetchAllTodos();
            setArrFilter('completed');
          }}
          count={arrOfTodos.reduce((acc, el) => (el.isDone ? acc + 1 : acc), 0)}
        />
      </div>
      <div className={styles.todoCardsWrapper}>
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
    </>
  );
};
