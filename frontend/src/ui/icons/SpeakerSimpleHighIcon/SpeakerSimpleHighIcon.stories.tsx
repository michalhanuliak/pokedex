import { SpeakerSimpleHighIcon } from './SpeakerSimpleHighIcon'

const meta = {
  title: 'Icon/SpeakerSimpleHighIcon',
  component: SpeakerSimpleHighIcon,
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
