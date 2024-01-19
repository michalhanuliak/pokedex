import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { StatRow } from '.'

test('StatRow', () => {
  render(<StatRow label="test" value="0" />)
  expect(screen.getByText('test')).toBeDefined()
})
