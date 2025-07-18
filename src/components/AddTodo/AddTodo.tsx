import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './AddTodo.module.css';
import type { AddTodoProps } from './AddTodo.props';
import { postNewTodo } from '../../api/api';

export const AddTodo = ({ fetchAllTodos }: AddTodoProps) => {
  const [todo, setTodo] = useState('');

  const addNewTodo = async (title: string) => {
    await postNewTodo(title);
    await fetchAllTodos();
  };

  const handleInput = () => {
    const todoTrimmed = todo.trim();
    if (todoTrimmed) {
      if (todoTrimmed.length > 2) {
        addNewTodo(todoTrimmed);
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
