import classNames from 'classnames'
import { MouseEvent, ReactNode } from 'react'
import styles from './styles.module.scss'

export type IconButtonProps = {
  icon: ReactNode
  className?: string
  onClick: (e: MouseEvent<Element>) => void
  hideShadow?: boolean
  active?: boolean
}

export function IconButton({
  icon,
  className,
  onClick,
  hideShadow = false,
  active = false,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.main,
        hideShadow && styles.noShadow,
        active && styles.active,
        className,
      )}
    >
      {icon}
    </button>
  )
}
