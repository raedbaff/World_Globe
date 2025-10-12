import * as THREE from "three";
export function latLonToVector3([lon, lat]: [number, number], radius = 1.01) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (90 - lon) * (Math.PI / 180);

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}
