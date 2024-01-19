import { EyeIcon } from '../../icons'
import { IconButton } from './IconButton'

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
}
export default meta

export const Default = {
  args: {
    icon: EyeIcon,
    onClick: () => console.log('Button clicked'),
    hideShadow: false,
    active: false,
  },
}

export const ActiveWithShadow = {
  ...Default,
  args: {
    ...Default.args,
    active: true,
  },
}

export const HiddenShadow = {
  ...Default,
  args: {
    ...Default.args,
    hideShadow: true,
  },
}
