import data from "../assets/data/triangles.json";
import * as THREE from "three";
import { useMemo } from "react";
import { latLonToVector3 } from "../helpers/verticeConvetor";

const World = () => {
  const group = new THREE.Group();
  const meshes = useMemo(() => {
    data.features.forEach((feature) => {
      const vertices: number[] = [];
      const lowerVertices: number[] = [];
      feature.geometry.coordinates.forEach((polygon) => {
        polygon.forEach((triangle) => {
          for (let i = 0; i < triangle.length - 1; i++) {
            const [lon, lat] = triangle[i];
            const p = latLonToVector3([lon, lat], 1.02);
            const p2 = latLonToVector3([lon, lat], 1.01);
            vertices.push(p.x, p.y, p.z);
            lowerVertices.push(p2.x, p2.y, p2.z);
          }
        });
      });
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );
      geo.computeVertexNormals();

      const color = new THREE.Color("#212721");
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({
          color,
          side: THREE.DoubleSide,
          flatShading: true,
        }),
      );
      group.add(mesh);
    });
    return group;
  }, []);

  return <primitive object={meshes} />;
};

export default World;
