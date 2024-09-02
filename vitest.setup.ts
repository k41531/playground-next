import '@testing-library/jest-dom/vitest'
import { server } from './mocks/node'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { vi } from 'vitest'

// 3d系はテストしたくない
vi.mock('@react-three/fiber')
vi.mock('three')

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})