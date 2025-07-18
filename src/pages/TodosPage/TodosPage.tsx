import { useEffect, useState } from 'react';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import styles from './TodosPage.module.css';
import { DisplaySwitcher } from '../../components/DisplaySwitcher/DisplaySwitcher';
import { TodoList } from '../../components/TodoList/TodoList';
import { fetchAllTodos } from '../../api/api';

export const TodosPage = () => {
  useEffect(() => {
    fetchAllTodos(setArrOfTodos, setInfo);
  }, []);

  const [arrOfTodos, setArrOfTodos] = useState<
    {
      id: number;
      title: string;
      created: string;
      isDone: boolean;
    }[]
  >([]);

  const [info, setInfo] = useState<{
    all: number;
    completed: number;
    inWork: number;
  }>({ all: 0, completed: 0, inWork: 0 });

  const [arrFilter, setArrFilter] = useState<'all' | 'inWork' | 'completed'>(
    'all'
  );

  return (
    <>
      <h1>Ваши задачи</h1>
      <AddTodo fetchAllTodos={() => fetchAllTodos(setArrOfTodos, setInfo)} />
      <div className={styles.displaySwitcherWrapper}>
        <DisplaySwitcher
          isDisabled={arrFilter === 'all'}
          text={'Все'}
          count={info.all}
          setArrFilter={() => {
            fetchAllTodos(setArrOfTodos, setInfo);
            setArrFilter('all');
          }}
        />
        <DisplaySwitcher
          text={'Активные'}
          isDisabled={arrFilter === 'inWork'}
          setArrFilter={() => {
            fetchAllTodos(setArrOfTodos, setInfo);
            setArrFilter('inWork');
          }}
          count={info.inWork}
        />
        <DisplaySwitcher
          text={'Завершенные'}
          isDisabled={arrFilter === 'completed'}
          setArrFilter={() => {
            fetchAllTodos(setArrOfTodos, setInfo);
            setArrFilter('completed');
          }}
          count={info.completed}
        />
      </div>
      <TodoList
        arrOfTodos={arrOfTodos}
        arrFilter={arrFilter}
        fetchAllTodos={() => fetchAllTodos(setArrOfTodos, setInfo)}
      />
    </>
  );
};
