import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function RotatingBox() {
	const meshRef = useRef<Mesh>(null);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.x += delta;
			meshRef.current.rotation.y += delta * 0.5;
		}
	});

	return (
		<mesh ref={meshRef}>
			<boxGeometry args={[2, 2, 2]} />
			<meshPhongMaterial />
		</mesh>
	);
}

export default function Box() {
	return (
		<Canvas>
			<RotatingBox />
			<ambientLight intensity={0.1} />
			<directionalLight position={[0, 0, 5]} color="red" />
		</Canvas>
	);
}
