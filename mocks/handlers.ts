import { http, graphql, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
  http.post('https://api.example.com/api/login', () => {
    return HttpResponse.json({
      token: 'fake-jwt-token',
    })
  }),
]