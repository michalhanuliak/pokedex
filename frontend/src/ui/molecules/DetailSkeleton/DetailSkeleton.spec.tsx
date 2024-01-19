import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { DetailSkeleton } from '.'

test('DetailSkeleton', () => {
  render(<DetailSkeleton title="test" disableThrottle />)
  expect(screen.getByText('test')).toBeDefined()
})
