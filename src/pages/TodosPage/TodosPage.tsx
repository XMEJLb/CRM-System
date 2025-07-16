import { useState } from 'react';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import styles from './TodosPage.module.css';
import { DisplaySwitcher } from '../../components/DisplaySwitcher/DisplaySwitcher';
import { TodoCard } from '../../components/TodoCard/TodoCard';

export const TodosPage = () => {
  const [arrOfTodos, setArrOfTodos] = useState<
    { id: number; text: string; finished: boolean }[]
  >([]);

  const handleDelete = (id: number) => {
    const newArrOfTodos = arrOfTodos.filter((el) => el.id !== id);
    setArrOfTodos([...newArrOfTodos]);
  };

  const [arrFilter, setArrFilter] = useState<'all' | 'active' | 'finished'>(
    'all'
  );

  return (
    <>
      <h1>Ваши задачи</h1>
      <AddTodo setArrOfTodos={setArrOfTodos} arrOfTodos={arrOfTodos} />
      <div className={styles.displaySwitcherWrapper}>
        <DisplaySwitcher
          isDisabled={arrFilter === 'all'}
          text={'Все'}
          count={arrOfTodos.length}
          setArrFilter={() => setArrFilter('all')}
        />
        <DisplaySwitcher
          text={'Активные'}
          isDisabled={arrFilter === 'active'}
          setArrFilter={() => setArrFilter('active')}
          count={arrOfTodos.reduce(
            (acc, el) => (!el.finished ? acc + 1 : acc),
            0
          )}
        />
        <DisplaySwitcher
          text={'Завершенные'}
          isDisabled={arrFilter === 'finished'}
          setArrFilter={() => setArrFilter('finished')}
          count={arrOfTodos.reduce(
            (acc, el) => (el.finished ? acc + 1 : acc),
            0
          )}
        />
      </div>
      <div className={styles.todoCardsWrapper}>
        {!arrOfTodos.length && 'Нет задач'}
        {arrFilter === 'all' &&
          arrOfTodos.map((el) => (
            <TodoCard
              setArrOfTodos={setArrOfTodos}
              arrOfTodos={arrOfTodos}
              key={el.id}
              id={el.id}
              finished={el.finished}
              handleDelete={handleDelete}
            >
              {el.text}
            </TodoCard>
          ))}
        {arrFilter === 'active' &&
          arrOfTodos
            .filter((el) => el.finished === false)
            .map((el) => (
              <TodoCard
                setArrOfTodos={setArrOfTodos}
                arrOfTodos={arrOfTodos}
                key={el.id}
                id={el.id}
                finished={el.finished}
                handleDelete={handleDelete}
              >
                {el.text}
              </TodoCard>
            ))}
        {arrFilter === 'finished' &&
          arrOfTodos
            .filter((el) => el.finished === true)
            .map((el) => (
              <TodoCard
                setArrOfTodos={setArrOfTodos}
                arrOfTodos={arrOfTodos}
                key={el.id}
                id={el.id}
                finished={el.finished}
                handleDelete={handleDelete}
              >
                {el.text}
              </TodoCard>
            ))}
      </div>
    </>
  );
};
