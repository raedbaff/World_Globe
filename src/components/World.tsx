import data from "../assets/data/triangles.json";
import * as THREE from "three";
import { useMemo } from "react";
import { latLonToVector3 } from "../helpers/verticeConvetor";

const World = () => {
  const meshes = useMemo(() => {
    const group = new THREE.Group();

    data.features.forEach((feature) => {
      const vertices: number[] = [];

      feature.geometry.coordinates.forEach((multiPolygon) => {
        multiPolygon.forEach((triangle) => {
          // Each triangle ring closes on itself
          for (let i = 0; i < triangle.length - 1; i++) {
            const [lon, lat] = triangle[i];
            const p = latLonToVector3([lon, lat], 1.02);
            vertices.push(p.x, p.y, p.z);
          }
        });
      });

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      geo.computeVertexNormals();

      const color = feature.properties?.nullData
        ? new THREE.Color("#003366") // ocean
        : new THREE.Color("#00aa55"); // land

      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({
          color,
          side: THREE.DoubleSide,
          flatShading: true,
        })
      );

      group.add(mesh);
    });

    return group;
  }, []);

  return <primitive object={meshes} />;
};

export default World;
