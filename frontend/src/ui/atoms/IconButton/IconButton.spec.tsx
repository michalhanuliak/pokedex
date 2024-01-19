import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { IconButton } from '.'

test('IconButton', () => {
  render(<IconButton icon={undefined} onClick={() => console.log()} />)
  expect(screen.getAllByRole('button')).toBeDefined()
})
