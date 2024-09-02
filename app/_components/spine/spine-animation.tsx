import  { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import * as spine from '@esotericsoftware/spine-threejs';

interface SpineMeshProps {
  baseUrl: string;
  skeletonFile: string;
  initialAnimation: string;
  scale?: number;
  position?: [number, number, number];
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const SpineMesh: React.FC<SpineMeshProps> = ({
  baseUrl,
  skeletonFile,
  initialAnimation,
  scale = 1,
  position = [0, 0, 0],
  onLoad,
  onError
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const skeletonMeshRef = useRef<spine.SkeletonMesh | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const atlasFile = skeletonFile
    .replace("-pro", "")
    .replace("-ess", "")
    .replace(".json", ".atlas");
    const assetManager = new spine.AssetManager(baseUrl);
    
    assetManager.loadText(skeletonFile);
    assetManager.loadTextureAtlas(atlasFile);

    const loadAssets = () => {
      if (assetManager.isLoadingComplete()) {
        try {
          const atlas = assetManager.require(atlasFile);
          const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
          const skeletonJson = new spine.SkeletonJson(atlasLoader);

          skeletonJson.scale = scale;
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
          skeletonMesh.state.setAnimation(0, initialAnimation, true);
          skeletonMeshRef.current = skeletonMesh;
          
          if (meshRef.current) {
            meshRef.current.add(skeletonMesh);
          }
          
          setIsLoaded(true);
          onLoad?.();
        } catch (error) {
          onError?.(error instanceof Error ? error : new Error('Failed to load Spine animation'));
        }
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
  }, [baseUrl, skeletonFile, initialAnimation, scale, onLoad, onError]);

  useFrame((state, delta) => {
    if (isLoaded && skeletonMeshRef.current) {
      skeletonMeshRef.current.update(delta);
    }
  });

  return <group ref={meshRef} position={position} />;
};

interface SpineAnimationProps extends SpineMeshProps {
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  cameraNear?: number;
  cameraFar?: number;
}

const SpineAnimation: React.FC<SpineAnimationProps> = ({
  cameraPosition = [0, 100, 400],
  cameraFov = 75,
  cameraNear = 1,
  cameraFar = 3000,
  ...spineMeshProps
}) => {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: cameraFov, near: cameraNear, far: cameraFar }}
      style={{ width: '100%', height: '100%' }}
    >
      <SpineMesh {...spineMeshProps} />
    </Canvas>
  );
};

export default SpineAnimation;