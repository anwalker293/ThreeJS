import { Canvas } from "@react-three/fiber"
import "./style.css"
import ReactDOM from "react-dom/client"
import Experience from "./Experience.jsx"

const root = ReactDOM.createRoot(document.querySelector("#root"))
const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [3, 2, 6],
}

root.render(
  <Canvas
    // flat
    gl={{ antialias: true }}
    camera={cameraSettings}
  >
    <Experience />
  </Canvas>
)
