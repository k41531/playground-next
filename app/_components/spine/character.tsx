import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as spine from '@esotericsoftware/spine-threejs';

const SpineAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let geometry: THREE.BoxGeometry;
    let material: THREE.MeshBasicMaterial;
    let mesh: THREE.Mesh;
    let skeletonMesh: spine.SkeletonMesh;
    let assetManager: spine.AssetManager;
    // let controls: OrbitControls;
    let lastFrameTime = Date.now() / 1000;

    const baseUrl = "assets/";
    const skeletonFile = "spineboy-pro.json";
    const atlasFile = skeletonFile
      .replace("-pro", "")
      .replace("-ess", "")
      .replace(".json", ".atlas");
    const animation = "walk";

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
      camera.position.y = 100;
      camera.position.z = 400;
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current ?? document.createElement('canvas') });
      renderer.setSize(width, height);
      // controls = new OrbitControls(camera, renderer.domElement);

      assetManager = new spine.AssetManager(baseUrl);
      assetManager.loadText(skeletonFile);
      assetManager.loadTextureAtlas(atlasFile);

      requestAnimationFrame(load);
    };

    const load = () => {
      if (assetManager.isLoadingComplete()) {
        geometry = new THREE.BoxGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true,
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const atlas = assetManager.require(atlasFile);
        const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
        const skeletonJson = new spine.SkeletonJson(atlasLoader);

        skeletonJson.scale = 0.4;
        const skeletonData = skeletonJson.readSkeletonData(
          assetManager.require(skeletonFile)
        );

        skeletonMesh = new spine.SkeletonMesh(
          skeletonData,
          (parameters) => {
            parameters.depthTest = true;
            parameters.depthWrite = true;
            parameters.alphaTest = 0.001;
          }
        );
        skeletonMesh.state.setAnimation(0, animation, true);
        mesh.add(skeletonMesh);

        requestAnimationFrame(render);
      } else requestAnimationFrame(load);
    };

    const render = () => {
      const now = Date.now() / 1000;
      const delta = now - lastFrameTime;
      lastFrameTime = now;

      resize();
      // controls.update();
      skeletonMesh.update(delta);
      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvasRef.current) {
        if (canvasRef.current.width !== w || canvasRef.current.height !== h) {
          canvasRef.current.width = w;
          canvasRef.current.height = h;
        }
      }

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    init();

    return () => {
      // Cleanup
      if (renderer) {
        renderer.dispose();
      }
      // if (controls) {
      //   controls.dispose();
      // }
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default SpineAnimation;
