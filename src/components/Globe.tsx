import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Space from "./Space";
import World from "./World";
import Arc from "./Arc";
import * as THREE from "three";
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
          side={THREE.BackSide} // render inside out to get a halo
        />
      </mesh>
      <World />
      <Arc />

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
