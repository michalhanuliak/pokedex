import { Tab } from './Tab'

const meta = {
  title: 'Molecules/Tab',
  component: Tab,
}
export default meta

export const InactiveTab = {
  args: {
    category: 'Category 1',
    path: 'category1',
    active: false,
  },
}

export const ActiveTab = {
  args: {
    category: 'Category 2',
    path: 'category2',
    active: true,
  },
}
