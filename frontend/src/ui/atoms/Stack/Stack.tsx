import classNames from 'classnames'
import { HTMLAttributes, PropsWithChildren } from 'react'
import styles from './styles.module.scss'

export type StackProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    column?: boolean
    className?: string
  }>

export function Stack({
  className,
  children,
  column = false,
  ...props
}: StackProps) {
  return (
    <div
      className={classNames(
        styles.main,
        column ? styles.column : '',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
