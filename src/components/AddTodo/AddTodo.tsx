import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './AddTodo.module.css';
import type { AddTodoProps } from './AddTodo.props';

export const AddTodo = ({ fetchAllTodos }: AddTodoProps) => {
  const [todo, setTodo] = useState('');

  const postNewTodo = async (title: string) => {
    await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        isDone: false,
      }),
    });

    await fetchAllTodos();
  };

  const handleInput = () => {
    const todoTrimmed = todo.trim();
    if (todoTrimmed) {
      if (todoTrimmed.length > 2) {
        postNewTodo(todoTrimmed);
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
