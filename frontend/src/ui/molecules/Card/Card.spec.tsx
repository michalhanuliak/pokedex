import { render, screen } from '@testing-library/react'

import { expect, test } from 'vitest'

import { Card } from '.'

test('Card', () => {
  render(
    <Card>
      <div id="test">test</div>
    </Card>,
  )
  expect(screen.getByText('test')).toBeDefined()
})
