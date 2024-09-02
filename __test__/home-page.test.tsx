import { afterEach, beforeAll, beforeEach, describe, expect, it, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
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
    beforeEach(() => {
      render(<Layout>
        <HomePage/>
      </Layout>)
    })

    afterEach(() => {
      cleanup();
    });

    it('ホーム画面にユーザーの名前が表示される', () => {
      const usernameElement = screen.getByTestId('username')
      expect(usernameElement).toBeInTheDocument()
    })

    it('ホーム画面ではBottomNavigationが表示される', () => {
   
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

    test('ホーム画面にスコアが表示されている', () => {
      const scoreElement = screen.getByTestId('score')
      expect(scoreElement).toBeInTheDocument()
    })

    test('プラスボタンを押したら１増えるか', async () => {
      const initialScore = 100;

      const scoreElement = screen.getByTestId('score');
      
      expect(scoreElement).toHaveTextContent(initialScore.toString());

      const incrementButton = screen.getByRole('button', { name: 'プラス' });
      fireEvent.click(incrementButton);

      await waitFor(() => {
        expect(scoreElement).toHaveTextContent((initialScore + 1).toString());
      });
    })

    it('マイナスボタンを押したら１減るか', async () => {
      const initialScore = 100;

      const scoreElement = screen.getByTestId('score');
      expect(scoreElement).toHaveTextContent(initialScore.toString());

      const decrementButton = screen.getByRole('button', { name: 'マイナス' });
      fireEvent.click(decrementButton);

      await waitFor(() => {
        expect(scoreElement).toHaveTextContent((initialScore - 1).toString());
      });
    })

  })