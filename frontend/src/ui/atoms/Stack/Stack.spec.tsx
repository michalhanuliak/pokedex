import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Stack } from '.'

test('Stack', () => {
  render(
    <Stack>
      <div id="test">test</div>
    </Stack>,
  )
  expect(screen.getAllByText('test')).toBeDefined()
})
