'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Box from '../_components/3d/box'
import SpineAnimation from '../_components/spine/spine-animation'
import Score from '../_components/score'
import Button from '../_components/button'

export default function HomePage() {
  const router = useRouter()
  const [score, setScore] = useState(100) // Add state for score

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
      <Score score={score} /> {/* Use state score */}
  
      <Button label="マイナス" onClick={() => setScore(score - 1)} />
      <Button label="プラス" onClick={() => setScore(score + 1)} />
      <Box />
      <SpineAnimation
        baseUrl="assets/spineboy/"
        skeletonFile="spineboy-pro.json"
        initialAnimation="walk"
        scale={1.0}
        position={[0, -300, 0]}
        cameraPosition={[0, 200, 600]}
        onLoad={() => console.log('Spine animation loaded')}
        onError={(error) => console.error('Failed to load Spine animation:', error)}
      />
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
