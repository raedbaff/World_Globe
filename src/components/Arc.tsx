import * as THREE from "three";
import { useEffect } from "react";
import { latLonToVector3 } from "../helpers/verticeConvetor";
import { useThree } from "@react-three/fiber";

const Arc = () => {
  return;
  const { scene } = useThree();

  const start = [9.537, 33.8869];
  const end = [-98.5795, 39.8283];

  const startVec = latLonToVector3([start[0], start[1]], 1.02);
  const endVec = latLonToVector3([end[0], end[1]], 1.02);

  const points: THREE.Vector3[] = [];
  const segments = 50;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const lerped = new THREE.Vector3().lerpVectors(startVec, endVec, t);

    // add curve height
    const height = Math.sin(Math.PI * t) * 0.3;
    const dir = lerped.clone().normalize();
    lerped.add(dir.multiplyScalar(height));

    points.push(lerped);
  }
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: "red",
    linewidth: 2,
  });
  const line = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(line);
  const sphereGeometry = new THREE.SphereGeometry(0.01, 64, 64);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: "green" });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  useEffect(() => {
    if (!sphere) return;

    const startTime = performance.now();
    const duration = 2000; // 2 seconds

    function animate() {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Calculate which segment index we are at
      const index = Math.floor(t * segments);
      sphere.position.copy(points[index]);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }, []);

  return <></>;
};

export default Arc;
