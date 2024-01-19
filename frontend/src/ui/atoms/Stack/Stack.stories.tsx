import { Stack } from './Stack'

const meta = {
  title: 'Atoms/Stack',
  component: Stack,
}
export default meta

export const Default = {
  args: {
    children: (
      <>
        <div>Item 1</div>
        <div>Item 2</div>
        // Add more items as needed
      </>
    ),
    column: false,
  },
}

export const Column = {
  ...Default,
  args: {
    ...Default.args,
    column: true,
  },
}
