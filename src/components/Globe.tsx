import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Space from "./Space";
import World from "./World";
import Arc from "./Arc";
import * as THREE from "three";
import { useEffect, useState } from "react";
import type { Attack } from "../types/Attack";
import { sampleAttacks } from "../data/Attacks";
const Globe = () => {
  const [cyberAttacks, setCyberAttacks] = useState<Attack[]>([]);
  useEffect(() => {
    const id = setInterval(() => {
      const random = Math.floor(Math.random() * 10);
      console.log(random);
      setCyberAttacks([sampleAttacks[random]]);
      console.log("tick");
    }, 3000);
    return () => clearInterval(id);
  }, []);
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
      {cyberAttacks.map((attack) => {
        return <Arc key={attack.id} attack={attack} />;
      })}

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
