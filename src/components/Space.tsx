import { useLoader } from "@react-three/fiber";
import space from "../assets/space.png";
import { TextureLoader } from "three";

const Space = () => {
  const texture = useLoader(TextureLoader, space);
  return <primitive attach="background" object={texture} />;
};

export default Space;
