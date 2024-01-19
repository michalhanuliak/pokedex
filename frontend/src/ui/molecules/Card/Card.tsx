import { PropsWithChildren } from 'react'

import { classNames } from '@/lib/classNames'
import { Stack } from '../../atoms'
import styles from './styles.module.scss'

export type CardProps = PropsWithChildren<{
  className?: string
  onClick?: () => void
}>

export function Card({ className, onClick, children }: CardProps) {
  return (
    <Stack
      column
      onClick={onClick}
      className={classNames(styles.main, className)}
    >
      {children}
    </Stack>
  )
}
