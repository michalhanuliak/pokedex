import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

export type StackProps = PropsWithChildren<{
  direction?: 'row' | 'column'
  sx?: Record<string, unknown>
}>

export function Stack({ sx, children, direction = 'row' }: StackProps) {
  return (
    <div
      className={classNames(
        styles.main,
        direction === 'column' ? styles.column : '',
        sx,
      )}
    >
      {children}
    </div>
  )
}
