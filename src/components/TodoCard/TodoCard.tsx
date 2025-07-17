import { useEffect, useRef, useState } from 'react';
import styles from './TodoCard.module.css';
import type { TodoCardProps } from './TodoCard.props';
import binIcon from '../../assets/bin-icon.svg';
import penIcon from '../../assets/pen-icon.svg';
import checkIcon from '../../assets/check-icon.svg';
import crossIcon from '../../assets/cross-icon.svg';
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
    if (inputValue.trim()) {
      if (inputValue.trim().length > 2) {
        const newArrOfTodos = arrOfTodos.map((el) =>
          el.id === id ? { ...el, text: inputValue } : el
        );
        setArrOfTodos(newArrOfTodos);
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
      <input type="checkbox" checked={isChecked} onChange={onHandleChange} />
      <input
        ref={inputRef}
        type="text"
        minLength={2}
        maxLength={64}
        className={`${styles.input} ${isChecked ? styles.checked : ''}`}
        value={inputValue}
        onChange={handleInputChange}
        disabled={isDisable}
      />

      {isDisable && (
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
      )}

      {!isDisable && (
        <div className={styles.buttonsWrapper}>
          <button className={styles.buttonDelete} onClick={handleSave}>
            <img className={styles.icon} src={checkIcon} alt="check" />
          </button>
          <button className={styles.buttonDelete} onClick={handleDeclineEdit}>
            <img className={styles.icon} src={crossIcon} alt="cross" />
          </button>
        </div>
      )}
    </div>
  );
};
