import { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import * as spine from '@esotericsoftware/spine-threejs';

const SpineMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const skeletonMeshRef = useRef<spine.SkeletonMesh | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const baseUrl = "assets/";
    const skeletonFile = "spineboy-pro.json";
    const atlasFile = skeletonFile
      .replace("-pro", "")
      .replace("-ess", "")
      .replace(".json", ".atlas");
    const animation = "walk";

    const assetManager = new spine.AssetManager(baseUrl);
    assetManager.loadText(skeletonFile);
    assetManager.loadTextureAtlas(atlasFile);

    const loadAssets = () => {
      if (assetManager.isLoadingComplete()) {
        const atlas = assetManager.require(atlasFile);
        const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
        const skeletonJson = new spine.SkeletonJson(atlasLoader);

        skeletonJson.scale = 0.4;
        const skeletonData = skeletonJson.readSkeletonData(
          assetManager.require(skeletonFile)
        );

        const skeletonMesh = new spine.SkeletonMesh(
          skeletonData,
          (parameters) => {
            parameters.depthTest = true;
            parameters.depthWrite = true;
            parameters.alphaTest = 0.001;
          }
        );
        skeletonMesh.state.setAnimation(0, animation, true);
        skeletonMeshRef.current = skeletonMesh;
        
        if (meshRef.current) {
          meshRef.current.add(skeletonMesh);
        }
        
        setIsLoaded(true);
      } else {
        requestAnimationFrame(loadAssets);
      }
    };

    loadAssets();

    return () => {
      if (skeletonMeshRef.current) {
        skeletonMeshRef.current.dispose();
      }
    };
  }, []);

  useFrame((state, delta) => {
    if (isLoaded && skeletonMeshRef.current) {
      skeletonMeshRef.current.update(delta);
    }
  });

  return (
    <mesh ref={meshRef}>
    </mesh>
  );
};

const SpineAnimation: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 100, 400], fov: 75, near: 1, far: 3000 }}
      style={{ width: '100%', height: '100%' }}
    >
      <SpineMesh />
    </Canvas>
  );
};

export default SpineAnimation;