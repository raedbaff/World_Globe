import * as three from "three";
export function createTexture(mesh: three.Mesh) {
  const geomtery = mesh.geometry;
  const material = mesh.material;
  const position = geomtery.getAttribute("position");
  const vertices: three.Vector3[] = [];
  for (let i = 0; i < position.count; i++) {
    vertices.push(
      new three.Vector3(position.getX(i), position.getY(i), position.getZ(i)),
    );
  }
  const uvs: number[] = [];
  geomtery.computeBoundingBox();
  const bbox = geomtery.boundingBox!;
  const width = bbox.max.x - bbox.min.x;
  const height = bbox.max.y - bbox.min.y;
  for (let i = 0; i < vertices.length; i++) {
    const x = vertices[i].x;
    const y = vertices[i].y;
    const u = (x - bbox.min.x) / width;
    const v = (y - bbox.min.y) / height;
    uvs.push(u, v);
  }
  geomtery.setAttribute("uv", new three.Float32BufferAttribute(uvs, 2));
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");

  // Background

  if (!ctx) return;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Text
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 160px 'Times New Roman'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(mesh.name, canvas.width / 2, canvas.height / 2);
  const texture = new three.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const newMaterial = (material as three.MeshBasicMaterial).clone();
  newMaterial.map = texture;
  newMaterial.color.set(0xffffff);
  mesh.material = newMaterial;
}
