import type { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'submit' | 'button' | 'reset'
}

export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}
