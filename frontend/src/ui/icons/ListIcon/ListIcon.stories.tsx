import { ListIcon } from './ListIcon'

const meta = {
  title: 'Icon/ListIcon',
  component: ListIcon,
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
