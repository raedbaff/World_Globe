# 🌍 3D Globe Visualization

This project renders an interactive 3D globe with real 3D continents and animated attack arcs connecting points across the world.
It’s built using React, @react-three/fiber, and Three.js, leveraging GPU-accelerated rendering for smooth real-time visualization.

## 🚀 Features

- 🌐 Realistic 3D globe with geographic data projected from GeoJSON
- 🗺️ Accurate continent shapes rendered as 3D meshes
- ⚡ Dynamic arcs representing simulated network activity or attacks
- 🎥 Interactive camera with orbit and zoom controls
- 💡 Configurable materials, lighting, and animation speed

## 🧠 Tech Stack

- React – UI layer
- @react-three/fiber – React renderer for Three.js
- Three.js – 3D rendering engine
- d3-geo / GeoJSON – Geographic data projection
- Vite – Development and build tool

## 🏗️ Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🗺️ Data

The globe’s landmass is generated from GeoJSON world data, processed into 3D geometry for accurate projection on a sphere and triangulated using the following github repo : [geo_triangulate](https://github.com/jessihamel/geo_triangulate)

## 📜 License

MIT © 2025 Raed Baffoun
