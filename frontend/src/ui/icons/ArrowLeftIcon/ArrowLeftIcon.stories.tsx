import { ArrowLeftIcon } from './ArrowLeftIcon'

const meta = {
  title: 'Icon/ArrowLeftIcon',
  component: ArrowLeftIcon,
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
