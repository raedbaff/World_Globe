import data from "../assets/data/world.json";
import * as THREE from "three";
import { latLonToVector3 } from "../helpers/verticeConvetor";
import { useMemo } from "react";
import earcut from "earcut";

const World = () => {
  const geometry = useMemo(() => {
    const vertices: number[] = [];
    const indices: number[] = [];
    let vertexIndex = 0;

    data.features.forEach((feature) => {
      feature.geometry.coordinates.forEach((polygon) => {
        polygon.forEach((ring: number[][]) => {
          const flattened: number[] = [];
          ring.forEach(([lon, lat]) => flattened.push(lon, lat));

          const triangles = earcut(flattened);

          const ringVertices = ring.map(([lon, lat]) => {
            const p = latLonToVector3([lon, lat], 1.01);
            vertices.push(p.x, p.y, p.z);
            return vertexIndex++;
          });

          triangles.forEach((i) => {
            indices.push(ringVertices[i]);
          });
        });
      });
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    return geo;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#2b3a2c" side={THREE.DoubleSide} />
    </mesh>
  );
};

export default World;
