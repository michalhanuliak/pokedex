import { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

export type TextProps = PropsWithChildren<{}>

export function Text({ children }: TextProps) {
  return <p className={styles.main}>{children}</p>
}
