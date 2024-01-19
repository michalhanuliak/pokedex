import { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

export type TextProps = PropsWithChildren<{
  variant?: 'normal' | 'title'
}>

export function Text({ variant = 'normal', children }: TextProps) {
  return <p className={styles[variant]}>{children}</p>
}
