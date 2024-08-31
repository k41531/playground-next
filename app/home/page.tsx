'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      // If not logged in, redirect to the login page
      router.push('/')
    }
  }, [router])

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token')
    // Redirect to the login page
    router.push('/')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ホーム</h1>
      <p className="mb-4">ようこそ！ログインに成功しました。</p>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        ログアウト
      </button>
    </div>
  )
}
