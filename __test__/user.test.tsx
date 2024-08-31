import { login } from "../app/_repositories/user"
import { describe, expect, it } from "vitest"

describe('ユーザーログイン', () => {
  it('ログイン成功', async () => {
    const result = await login('testuser', 'password123')
    expect(result).toEqual({ token: 'fake-jwt-token' })
  })

  // it('should throw an error with incorrect credentials', async () => {
  //   await expect(login('wronguser', 'wrongpassword')).rejects.toThrow('Login failed')
  // })
})