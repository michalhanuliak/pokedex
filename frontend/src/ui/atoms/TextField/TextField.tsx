import classNames from 'classnames'
import { ChangeEvent, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

export type DefaultTextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
>

export type TextFieldProps = DefaultTextFieldProps & {
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
}

export function TextField({ className, onChange, ...props }: TextFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange?.(e, value)
  }

  return (
    <input
      onChange={handleChange}
      className={classNames(styles.main, className)}
      {...props}
    />
  )
}
