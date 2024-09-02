import { afterEach, beforeAll, beforeEach, describe, expect, it, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from '../app/page'

// useRouterのモック
const pushMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: pushMock,
    }
  },
}))

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
  test('有効なユーザー名とパスワードを入力してログインボタンをクリックすると、ログイン処理が開始される', () => {
    const usernameInput = screen.getByLabelText('ユーザー名')
    const passwordInput = screen.getByLabelText('パスワード')
    const loginButton = screen.getByText('ログイン')

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton)
  })
  
  test('ログイン処理中はログインボタンが無効になり、ローディング表示される', () => {
    const usernameInput = screen.getByLabelText('ユーザー名')
    const passwordInput = screen.getByLabelText('パスワード')
    const loginButton = screen.getByText('ログイン')

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton)
    expect(loginButton).toBeDisabled()
    expect(screen.getByText('ローディング...')).toBeDefined()
  })
  test('ログイン画面にはBottomNavigationが表示されない', () => {
    render(<Page />);
    const bottomNav = screen.queryByRole("navigation")
    expect(bottomNav).toBeNull();
  })
})
