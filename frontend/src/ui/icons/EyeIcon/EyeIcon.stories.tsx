import { EyeIcon } from './EyeIcon'

const meta = {
  title: 'Icon/EyeIcon',
  component: EyeIcon,
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
