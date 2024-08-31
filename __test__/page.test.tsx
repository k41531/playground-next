import { beforeAll, describe, expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
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
  test('ユーザー名が空の場合、ログインボタンが無効になっている', () => {
    const usernameInput = screen.getByLabelText('ユーザー名')
    const passwordInput = screen.getByLabelText('パスワード')
    const loginButton = screen.getByText('ログイン')

    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(loginButton).toBeDisabled()
  })
  test('パスワードが空の場合、ログインボタンが無効になっている', () => {
    const usernameInput = screen.getByLabelText('ユーザー名')
    const passwordInput = screen.getByLabelText('パスワード')
    const loginButton = screen.getByText('ログイン')

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    expect(loginButton).toBeDisabled()
  })
})