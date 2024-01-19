import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Select } from '.'

test('Select', () => {
  render(
    <Select
      options={[
        {
          label: 'test',
          value: 'test',
        },
      ]}
    />,
  )
  expect(screen.getByRole('option')).toBeDefined()
})
