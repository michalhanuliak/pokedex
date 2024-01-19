import { StatRow } from './StatRow'

const meta = {
  title: 'Molecules/StatRow',
  component: StatRow,
}
export default meta

export const Default = {
  args: {
    label: 'Sample Label',
    value: 'Sample Value',
  },
}

export const NumericValue = {
  args: {
    label: 'Number of Items',
    value: 42,
  },
}
