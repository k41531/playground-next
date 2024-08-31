import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'


test('ユーザー名入力フィールドが表示されている', () => {
  render(<Page />)
  const usernameInput = screen.getByLabelText('ユーザー名')
  expect(usernameInput).toBeDefined()
  expect(usernameInput).toHaveAttribute('type', 'text')
})

