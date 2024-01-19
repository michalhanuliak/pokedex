import { HeartIcon } from './HeartIcon'

const meta = {
  title: 'Icon/HeartIcon',
  component: HeartIcon,
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
