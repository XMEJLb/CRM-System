import styles from './TabButton.module.css'

interface TabButtonProps {
  text: string
  count: number
  setArrFilter: () => void
  isDisabled: boolean
}

export const TabButton = ({
  text,
  count,
  setArrFilter,
  isDisabled,
}: TabButtonProps) => {
  return (
    <button
      className={`${styles.button} ${isDisabled ? styles.active : ''}`}
      disabled={isDisabled}
      onClick={setArrFilter}
    >{`${text} ${count}`}</button>
  )
}
