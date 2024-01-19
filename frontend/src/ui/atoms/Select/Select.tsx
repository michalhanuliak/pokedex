import classNames from 'classnames'
import { ChangeEvent, SelectHTMLAttributes, useMemo } from 'react'
import styles from './styles.module.scss'

export type OptionProps = {
  label: string
  value: string
}

export type DefaultSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
>

export type SelectProps = DefaultSelectProps & {
  onChange?: (event: ChangeEvent<HTMLSelectElement>, value: string) => void
  options?: OptionProps[]
  loading?: boolean
}

export function Select({
  className,
  onChange,
  options = [],
  loading = false,
  ...props
}: SelectProps) {
  const renderedOptions = useMemo(
    () =>
      (options ?? []).map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
    [options],
  )

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    onChange?.(e, value)
  }

  return (
    <select
      onChange={handleChange}
      className={classNames(styles.main, className)}
      disabled={loading}
      {...props}
    >
      {renderedOptions}
    </select>
  )
}
