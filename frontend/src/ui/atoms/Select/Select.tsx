import { ChangeEvent, HTMLAttributes } from 'react'

export type OptionProps = {
  label: string
  value: string
}

export type DefaultSelectProps = Omit<
  HTMLAttributes<HTMLSelectElement>,
  'onChange'
>

export type SelectProps = DefaultSelectProps & {
  onChange?: (event: ChangeEvent<HTMLSelectElement>, value: string) => void
  options?: OptionProps[]
}

export function Select({ onChange, options = [], ...props }: SelectProps) {
  const renderedOptions = (options ?? []).map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    onChange?.(e, value)
  }

  return (
    <select onChange={handleChange} {...props}>
      {renderedOptions}
    </select>
  )
}
