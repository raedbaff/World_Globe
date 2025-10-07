import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Space from "./Space";
import World from "./World"
const Globe = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <Space />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={"white"} wireframe wireframeLinewidth={0.5} />
      </mesh>
      <World />

      <OrbitControls enableZoom enableRotate />
    </Canvas>
  );
};

export default Globe;


