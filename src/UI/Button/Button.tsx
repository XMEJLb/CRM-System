import styles from './Button.module.css'

interface ButtonProps {
  children: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'submit'
}

export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      <span> {children}</span>
    </button>
  )
}
