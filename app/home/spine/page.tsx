'use client'
import SpineAnimation from '../../_components/spine/spine-animation'
export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <SpineAnimation
        baseUrl="/assets/spineboy/"
        skeletonFile="spineboy-pro.json"
        initialAnimation="walk"
        scale={1.0}
        position={[0, -300, 0]}
        cameraPosition={[0, 200, 600]}
        onLoad={() => console.log('Spine animation loaded')}
        onError={(error) => console.error('Failed to load Spine animation:', error)}
      />

    </div>
  )
}
