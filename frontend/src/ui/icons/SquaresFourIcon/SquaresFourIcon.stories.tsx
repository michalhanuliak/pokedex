import { SquaresFourIcon } from './SquaresFourIcon'

const meta = {
  title: 'Icon/SquaresFourIcon',
  component: SquaresFourIcon,
}
export default meta

export const Default = {
  args: {
    color: 'blue',
    size: 32,
  },
}

export const CustomSize = {
  ...Default,
  args: {
    ...Default.args,
    size: 48,
  },
}
