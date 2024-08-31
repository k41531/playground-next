import { beforeAll, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import { before } from 'node:test'



describe('ログイン画面に関するテスト', () => {
  beforeAll(() => {
    render(<Page />)
  })
  test('ユーザー名入力フィールドが表示されている', () => {
    const usernameInput = screen.getByLabelText('ユーザー名')
    expect(usernameInput).toBeDefined()
    expect(usernameInput).toHaveAttribute('type', 'text')
  })
  test('パスワード入力フィールドが表示されている', () => {
    const passwordInput = screen.getByLabelText('パスワード')
    expect(passwordInput).toBeDefined()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
  test('ログインボタンが表示されている', () => {
    const loginButton = screen.getByText('ログイン')
    expect(loginButton).toBeDefined()
    expect(loginButton).toHaveAttribute('type', 'button')
  })
})