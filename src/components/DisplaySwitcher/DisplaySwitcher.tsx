import type { DisplaySwitcherProps } from './DisplaySwitcher.props';
import styles from './DisplaySwitcher.module.css';

export const DisplaySwitcher = ({
  text,
  count,
  setArrFilter,
  isDisabled,
}: DisplaySwitcherProps) => {
  return (
    <button
      className={styles.button}
      disabled={isDisabled}
      onClick={setArrFilter}
    >{`${text} ${count}`}</button>
  );
};
