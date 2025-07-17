import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import styles from './AddTodo.module.css';
import type { AddTodoProps } from './AddTodo.props';
export const AddTodo = ({ setArrOfTodos, arrOfTodos }: AddTodoProps) => {
  const [todo, setTodo] = useState('');

  const handleInput = () => {
    if (todo.trim()) {
      if (todo.trim().length > 2) {
        setArrOfTodos([
          { id: Date.now(), text: todo, finished: false },
          ...arrOfTodos,
        ]);
        setTodo('');
      } else {
        alert('Заметка должна быть длиннее 2 символов');
      }
    } else {
      alert('Заметка не должна содержать только пробелы');
      setTodo('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    console.log(arrOfTodos);
  }, [arrOfTodos]);

  return (
    <div className={styles.addtodo}>
      <input
        minLength={2}
        maxLength={64}
        value={todo}
        onChange={handleInputChange}
        className={styles.input}
        type="text"
      />
      <Button onClick={handleInput}>Добавить</Button>
    </div>
  );
};
