import styles from './ButtonIcon.module.css'

interface ButtonIconProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  imgSrc: string
  type?: 'submit' | 'button'
}

export const ButtonIcon = ({ onClick, imgSrc, type }: ButtonIconProps) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      <img className={styles.icon} src={imgSrc} alt="icon" />
    </button>
  )
}
