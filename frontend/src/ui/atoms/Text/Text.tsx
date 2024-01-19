import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

export type TextProps = PropsWithChildren<{
  className?: string
  variant?: 'normal' | 'title'
}>

export function Text({ className, variant = 'normal', children }: TextProps) {
  return <p className={classNames(styles[variant], className)}>{children}</p>
}
