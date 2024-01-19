import { Card } from './Card'

const meta = {
  title: 'Molecules/Card',
  component: Card,
}
export default meta

export const Default = {
  args: {
    onClick: () => console.log('Card clicked'),
    children: (
      <>
        <div>Content 1</div>
        <div>Content 2</div>
      </>
    ),
  },
}
