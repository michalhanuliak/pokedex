import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { TextField } from '.'

test('TextField', () => {
  render(<TextField placeholder="test" />)
  expect(screen.getAllByPlaceholderText('test')).toBeDefined()
})
