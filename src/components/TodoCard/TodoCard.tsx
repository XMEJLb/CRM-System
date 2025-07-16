import { useEffect, useRef, useState } from 'react';
import styles from './TodoCard.module.css';
import type { TodoCardProps } from './TodoCard.props';
import binIcon from '../../assets/bin-icon.svg';
import penIcon from '../../assets/pen-icon.svg';
export const TodoCard = ({
  children,
  handleDelete,
  id,
  finished,
  setArrOfTodos,
  arrOfTodos,
}: TodoCardProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(finished);

  const onHandleChange = () => {
    const newArrOfTodos = arrOfTodos.map((el) =>
      el.id === id ? { ...el, finished: !finished } : el
    );
    setArrOfTodos(newArrOfTodos);
    setIsChecked(!isChecked);
  };

  const [inputValue, setInputValue] = useState<string>(children);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [isEnable, setIsEnable] = useState<boolean>(true);

  useEffect(() => {
    if (!isEnable) {
      inputRef.current?.focus();
    }
  }, [isEnable]);

  const handleEdit = () => {
    setIsEnable((s) => !s);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.todoCard}>
      <input type="checkbox" checked={isChecked} onChange={onHandleChange} />
      <input
        ref={inputRef}
        type="text"
        className={`${styles.input} ${isChecked ? styles.checked : ''}`}
        value={inputValue}
        onChange={handleInputChange}
        disabled={isEnable}
        onBlur={() => setIsEnable(true)}
      />

      <div className={styles.buttonsWrapper}>
        <button className={styles.buttonDelete} onClick={handleEdit}>
          <img className={styles.icon} src={penIcon} alt="pen" />
        </button>
        <button
          className={styles.buttonDelete}
          onClick={() => handleDelete(id)}
        >
          <img className={styles.icon} src={binIcon} alt="bin" />
        </button>
      </div>
    </div>
  );
};
