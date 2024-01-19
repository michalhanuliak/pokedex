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
        className,
        column ? styles.column : '',
        styles.main,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
