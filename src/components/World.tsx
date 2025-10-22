import data from "../assets/data/triangles2.json";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { latLonToVector3 } from "../helpers/verticeConvetor";
import { useFrame, useThree } from "@react-three/fiber";
import borders from "../assets/data/borders.json";
import GeoJsonGeometry from "three-geojson-geometry";
import type { FeatureCollection, MultiPolygon } from "geojson";

const World = () => {
  const { camera } = useThree();
  const toolTip = document.getElementById("countryToolTip");
  const hoveredMesh = useRef<THREE.Mesh | null>(null);
  const mouse = useRef(new THREE.Vector2());
  const normalMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const raycaster = useRef(new THREE.Raycaster());
  const group = new THREE.Group();
  const meshesData = useRef<THREE.Mesh[]>([]);
  const meshes = useMemo(() => {
    borders.features.forEach((feature) => {
      const material = [new THREE.LineBasicMaterial({ color: "#56BD9A" })];
      const line = new THREE.LineSegments(
        new GeoJsonGeometry(feature.geometry as any, 1.021),
        material
      );
      group.add(line);
    });
    (data as FeatureCollection<MultiPolygon>).features
      .filter((feature) => !feature.properties?.nullData)
      .forEach((feature) => {
        const vertices: number[] = [];
        feature.geometry.coordinates.forEach((polygon) => {
          polygon.forEach((triangle) => {
            for (let i = 0; i < triangle.length - 1; i++) {
              const [lon, lat] = triangle[i];
              const p = latLonToVector3([lon, lat], 1.02);
              vertices.push(p.x, p.y, p.z);
            }
          });
        });
        const geo = new THREE.BufferGeometry();
        geo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vertices, 3)
        );
        geo.computeVertexNormals();

        const color = new THREE.Color("#121212");
        const mesh = new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({
            color,
            side: THREE.DoubleSide,
          })
        );
        mesh.name = feature?.properties?.COUNTRY;
        meshesData.current.push(mesh);
        group.add(mesh);
      });
    return group;
  }, []);

  const onMouseMove = (e: MouseEvent) => {
    normalMouse.current.x = e.clientX;
    normalMouse.current.y = e.clientY;

    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  useFrame(() => {
    if (!meshesData.current.length) return;
    raycaster.current.setFromCamera(mouse.current, camera);

    const intersect = raycaster.current.intersectObjects(meshesData.current);

    if (intersect.length > 0) {
      document.body.style.cursor = "pointer";
      const intersection = intersect[0].object as THREE.Mesh;
      if (hoveredMesh.current !== intersection) {
        if (hoveredMesh.current) {
          const resetMaterial = (
            hoveredMesh.current.material as THREE.MeshBasicMaterial
          ).clone();
          resetMaterial.color.set("#121212");
          hoveredMesh.current.material = resetMaterial;
        }

        const newMaterial = (
          intersection.material as THREE.MeshBasicMaterial
        ).clone();
        newMaterial.color.set("#B6E3D4");
        intersection.material = newMaterial;

        hoveredMesh.current = intersection;
        if (toolTip) {
          toolTip.style.display = "block";
          toolTip.style.left = `${normalMouse.current.x}px`;
          toolTip.style.top = `${normalMouse.current.y}px`;
          toolTip.innerHTML = intersection.name;
        }
      }
    } else {
      document.body.style.cursor = "default";
      if (toolTip) {
        toolTip.style.display = "none";
      }
      if (hoveredMesh.current) {
        const resetMaterial = (
          hoveredMesh.current.material as THREE.MeshBasicMaterial
        ).clone();
        resetMaterial.color.set("#121212");
        hoveredMesh.current.material = resetMaterial;
        hoveredMesh.current = null;
      }
    }
  });
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      e.stopPropagation();
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersect = raycaster.current.intersectObjects(meshesData.current);
      if (intersect.length > 0) {
        const intersection = intersect[0].object;
        console.log(intersection.name);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return <primitive object={meshes} />;
};

export default World;
