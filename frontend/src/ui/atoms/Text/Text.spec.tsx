import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Text } from '.'

test('Text', () => {
  render(<Text>test</Text>)
  expect(screen.getAllByText('test')).toBeDefined()
})
