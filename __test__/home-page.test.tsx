import { afterEach, beforeAll, beforeEach, describe, expect, it, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import HomePage from '../app/home/page'
import Layout from '../app/home/layout'

// useRouterのモック
const pushMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: pushMock,
    }
  },
}))

describe("ホーム画面に関するテスト", () => {
    beforeAll(() => {
      render(<Layout>
        <HomePage/>
      </Layout>)
    })

    test('ホーム画面ではBottomNavigationが表示される', () => {
   
      // Check if BottomNavigation is present
      const bottomNav = screen.getByRole('navigation')
      expect(bottomNav).toBeInTheDocument()
  
      // Check if the navigation contains the expected items
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Spine')).toBeInTheDocument()
      expect(screen.getByText('3D')).toBeInTheDocument()
  
      // Clean up the mock after the test
      vi.clearAllMocks()
    })
  })