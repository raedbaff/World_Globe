import * as THREE from "three";
import { useEffect } from "react";
import { latLonToVector3 } from "../helpers/verticeConvetor";
import { useThree } from "@react-three/fiber";
import type { Attack } from "../types/Attack";

const Arc = ({ attack }: { attack: Attack }) => {
  const { scene } = useThree();
  useEffect(() => {
    const start = [attack.source.longitude, attack.source.latitude];
    const end = [attack.target.longitude, attack.target.latitude];

    const startVec = latLonToVector3([start[0], start[1]], 1.02);
    const endVec = latLonToVector3([end[0], end[1]], 1.02);
    const maxPoints = 50;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < maxPoints; i++) {
      points.push(startVec.clone());
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: attack.category.color,
      linewidth: 4,
    });
    const line = new THREE.Line(lineGeometry, lineMaterial);

    const ringGeomatery = new THREE.RingGeometry(0.01, 0.02, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: attack.category.color,
      side: THREE.DoubleSide,
    });
    const startRing = new THREE.Mesh(ringGeomatery, ringMaterial);
    const endRing = startRing.clone();
    startRing.position.copy(startVec);
    endRing.position.copy(endVec);
    const startRingNormal = startVec.clone().normalize();
    const endRingNormal = endVec.clone().normalize();
    const startRingOffset = startVec.clone().add(startRingNormal);
    const endRingOffset = endVec.clone().add(endRingNormal);

    startRing.lookAt(startRingOffset);
    endRing.lookAt(endRingOffset);
    scene.add(startRing);
    scene.add(endRing);
    scene.add(line);
    const startTime = performance.now();
    const duration = 2000;
    const position = lineGeometry.attributes.position;
    let animationId: number;
    function animate() {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      const activePoints = Math.floor(t * maxPoints);

      for (let i = 0; i < activePoints; i++) {
        const progress = i / maxPoints;
        const base = new THREE.Vector3().lerpVectors(
          startVec,
          endVec,
          progress
        );
        const arcHeight = Math.sin(Math.PI * progress) * 0.4;
        const direction = base.clone().normalize();
        const curved = base.clone().add(direction.multiplyScalar(arcHeight));

        position.setXYZ(i, curved.x, curved.y, curved.z);
      }
      if (activePoints > 0) {
        const lastX = position.getX(activePoints - 1);
        const lastY = position.getY(activePoints - 1);
        const lastZ = position.getZ(activePoints - 1);
        for (let i = activePoints; i < maxPoints; i++) {
          position.setXYZ(i, lastX, lastY, lastZ);
        }
      }

      position.needsUpdate = true;

      if (t < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        cleanup();
      }
    }

    function cleanup() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      scene.remove(line);
      scene.remove(startRing);
      scene.remove(endRing);
      lineGeometry.dispose();
      ringGeomatery.dispose();
      lineMaterial.dispose();
      ringMaterial.dispose();
    }

    animate();

    return cleanup;
  }, [attack.id]);

  return <></>;
};

export default Arc;
