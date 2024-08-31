import { http, graphql, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
  http.post('https://api.example.com/api/login', async ({ request }) => {
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