import { HTMLAttributes } from 'react'

export type DefaultTextFieldProps = Omit<
  HTMLAttributes<HTMLInputElement>,
  'onChange'
>

export type TextFieldProps = DefaultTextFieldProps & {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
}

export function TextField({ onChange, ...props }: TextFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange?.(e, value)
  }

  return <input onChange={handleChange} {...props} />
}
