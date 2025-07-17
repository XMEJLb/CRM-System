import type { ButtonProps } from './Button.props';
import styles from './Button.module.css';
export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span> {children}</span>
    </button>
  );
};
