import { useLoader, useThree } from "@react-three/fiber";
import space from "../assets/space.png";
import { TextureLoader } from "three";
import * as THREE from "three";

const Space = () => {
  const { scene } = useThree();
  const sphereGeo = new THREE.SphereGeometry(3, 64, 64);
  const texture = useLoader(TextureLoader, space);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  const mesh = new THREE.Mesh(sphereGeo, material);
  scene.add(mesh);

  return <></>;
};

export default Space;
