import { PropsWithChildren } from 'react'

import { Stack } from '../../atoms'
import styles from './styles.module.scss'

export type CardProps = PropsWithChildren<{
  onClick?: () => void
}>

export function Card({ onClick, children }: CardProps) {
  return (
    <Stack column onClick={onClick} className={styles.main}>
      {children}
    </Stack>
  )
}
