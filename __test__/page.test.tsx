import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'



describe('ログイン画面に関するテスト', () => {
  test('ユーザー名入力フィールドが表示されている', () => {
    render(<Page />)
    const usernameInput = screen.getByLabelText('ユーザー名')
    expect(usernameInput).toBeDefined()
    expect(usernameInput).toHaveAttribute('type', 'text')
  })
  test('パスワード入力フィールドが表示されている', () => {
    render(<Page />)
    const passwordInput = screen.getByLabelText('パスワード')
    expect(passwordInput).toBeDefined()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})