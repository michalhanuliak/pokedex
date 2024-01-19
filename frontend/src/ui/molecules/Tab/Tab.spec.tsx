import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Tab } from '.'

test('Tab', () => {
  render(<Tab category="test" path="/" />)
  expect(screen.getByText('test')).toBeDefined()
})
