import { MouseEvent } from 'react'
import { Select } from './Select'

const meta = {
  title: 'Atoms/Select',
  component: Select,
}
export default meta

export const Default = {
  args: {
    onChange: (_: MouseEvent, value: string) =>
      console.log(`Selected: ${value}`),
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
    loading: false,
  },
}

export const LoadingState = {
  ...Default,
  args: {
    ...Default.args,
    loading: true,
  },
}
