import { getUser, login } from "../app/_repositories/user"
import { describe, expect, it } from "vitest"

describe('ユーザーログイン', () => {
  it('ユーザー情報を取得できる', async () => {
    const response = await getUser();
  
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    expect(await response.json()).toEqual({
      firstName: 'John',
      lastName: 'Maverick',
    })
  })
  it('ユーザーログインができる', async () => {
    const result = await login('testuser', 'password123')
    expect(result.status).toBe(200)
    expect(result.statusText).toBe('OK')
  })
})