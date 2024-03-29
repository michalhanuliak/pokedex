import { MouseEvent } from 'react'
import { TextField } from './TextField'

const meta = {
  title: 'Atoms/TextField',
  component: TextField,
}
export default meta

export const Default = {
  args: {
    onChange: (event: MouseEvent, value: string) =>
      // eslint-disable-next-line no-console
      console.log(`Text Field Changed: ${value}`),
    placeholder: 'Enter text here',
    type: 'text',
  },
}
