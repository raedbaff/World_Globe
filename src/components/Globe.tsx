import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Space from "./Space";
import World from "./World";
import Arc from "./Arc";
import * as THREE from "three";
import { useRef, useState } from "react";
import type { Attack } from "../types/Attack";
import { sampleAttacks } from "../data/Attacks";
const Globe = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <Space />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.005, 64, 64]} />{" "}
        <meshBasicMaterial
          color="cyan"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
      <World />
      <AttackManager />

      <OrbitControls
        enableZoom
        enableRotate
        enablePan={false}
        minDistance={2}
        maxDistance={4}
      />
    </Canvas>
  );
};

export default Globe;
const AttackManager = () => {
  const elapsedRef = useRef(0);
  const attacksLength = sampleAttacks.length;
  const remainingAttacks = useRef(attacksLength);
  const [cyberAttacks, setCyberAttacks] = useState<Attack[]>([]);

  useFrame((_state, delta) => {
    elapsedRef.current += delta;

    if (elapsedRef.current > 1) {
      remainingAttacks.current--;
      elapsedRef.current = 0;

      setCyberAttacks((prev) => [
        ...prev,
        sampleAttacks[remainingAttacks.current],
      ]);
    }

    if (remainingAttacks.current < 0) {
      setCyberAttacks([]);
      remainingAttacks.current = attacksLength;
    }
  });

  return (
    <>
      {cyberAttacks.map((attack) => (
        <Arc key={attack.id} attack={attack} />
      ))}
    </>
  );
};
