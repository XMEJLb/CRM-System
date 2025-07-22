import styles from './ButtonIcon.module.css'

interface ButtonIconProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  src: string
  type?: 'submit' | 'button'
}

export const ButtonIcon = ({ onClick, src, type }: ButtonIconProps) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      <img className={styles.icon} src={src} alt="icon" />
    </button>
  )
}
