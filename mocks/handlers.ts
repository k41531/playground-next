import { http, graphql, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:3000/api/user', () => {
    return HttpResponse.json({
      nickname: 'John Doe',
      score: 100,
    })
  }),
  http.post('http://localhost:3000/api/login', async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string }
 
    if (email === 'validuser' && password === 'password123') {
      return HttpResponse.json({
        token: 'fake-jwt-token',
      })
    }
    return HttpResponse.json({
      error: 'Invalid email or password',
    }, { status: 401 })
  }),
]