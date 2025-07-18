import { useEffect, useRef, useState } from 'react';
import styles from './TodoCard.module.css';
import type { TodoCardProps } from './TodoCard.props';
import binIcon from '../../assets/bin-icon.svg';
import penIcon from '../../assets/pen-icon.svg';
import checkIcon from '../../assets/check-icon.svg';
import crossIcon from '../../assets/cross-icon.svg';
import { deleteTodo, putTodoIsDone, putTodoTitle } from '../../api/api';
export const TodoCard = ({
  children,
  id,
  isDone,
  fetchAllTodos,
}: TodoCardProps) => {
  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    await fetchAllTodos();
  };

  const updateTodoTittle = async (title: string, id: number) => {
    putTodoTitle(title, id);
    await fetchAllTodos();
  };

  const changeTodoIsDone = async (isDone: boolean, id: number) => {
    await putTodoIsDone(isDone, id);
    await fetchAllTodos();
  };

  const [inputValue, setInputValue] = useState<string>(children);
  const [inputValuebeforEdit, setInputValuebeforEdit] =
    useState<string>(children);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [isDisable, setIsDisable] = useState<boolean>(true);

  useEffect(() => {
    if (!isDisable) {
      inputRef.current?.focus();
    }
  }, [isDisable]);

  const handleEdit = () => {
    setIsDisable((s) => !s);
    setInputValuebeforEdit(inputValue);
  };

  const handleSave = () => {
    const inputValueTrimmed = inputValue.trim();
    if (inputValueTrimmed) {
      if (inputValueTrimmed.length > 2) {
        updateTodoTittle(inputValueTrimmed, id);
        setIsDisable((s) => !s);
      } else {
        inputRef.current?.focus();
        alert('Заметка должна быть длиннее 2 символов');
      }
    } else {
      setInputValue('');
      inputRef.current?.focus();
      alert('Заметка не должна содержать только пробелы');
    }
  };

  const handleDeclineEdit = () => {
    setIsDisable((s) => !s);
    setInputValue(inputValuebeforEdit);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.todoCard}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => changeTodoIsDone(isDone, id)}
      />
      <input
        ref={inputRef}
        type="text"
        minLength={2}
        maxLength={64}
        className={`${styles.input} ${isDone ? styles.checked : ''}`}
        value={inputValue}
        onChange={handleInputChange}
        disabled={isDisable}
      />

      {isDisable && (
        <div className={styles.buttonsWrapper}>
          <button className={styles.button} onClick={handleEdit}>
            <img className={styles.icon} src={penIcon} alt="pen" />
          </button>
          <button className={styles.button} onClick={() => handleDelete(id)}>
            <img className={styles.icon} src={binIcon} alt="bin" />
          </button>
        </div>
      )}

      {!isDisable && (
        <div className={styles.buttonsWrapper}>
          <button className={styles.button} onClick={handleSave}>
            <img className={styles.icon} src={checkIcon} alt="check" />
          </button>
          <button className={styles.button} onClick={handleDeclineEdit}>
            <img className={styles.icon} src={crossIcon} alt="cross" />
          </button>
        </div>
      )}
    </div>
  );
};
