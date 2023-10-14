import { OrbitControls } from "@react-three/drei"
import Cube from "./Cube.jsx"
import { button, useControls } from "leva"
import { Perf } from "r3f-perf"

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: true,
  })
  // const { x, y, z } = useControls({
  //   x: {
  //     value: -3,
  //     min: -4,
  //     max: 4,
  //     step: 0.01,
  //   },
  //   y: {
  //     value: 0,
  //     min: -4,
  //     max: 4,
  //     step: 0.01,
  //   },
  //   z: {
  //     value: 0,
  //     min: -4,
  //     max: 4,
  //     step: 0.01,
  //   },
  // })
  const { position, color, visible, myInterval, clickMe } = useControls(
    "sphere",
    {
      position: {
        value: { x: -2, y: 0, z: 0 },
        step: 0.01,
        // joystick: 'invertY'
      },
      color: "#ff0000",
      visible: true,
      myInterval: {
        min: 0,
        max: 10,
        value: [4, 5],
      },
      clickMe: button(() => {
        console.log("ok")
      }),
      choice: { options: ["a", "b", "c"] },
    }
  )
  const { positionCube, colorCube, visibleCube, myIntervalCube, clickMeCube } =
    useControls("cube", {
      position: {
        value: { x: -2, y: 0, z: 0 },
        step: 0.01,
        // joystick: 'invertY'
      },
      color: "#ff0000",
      visible: true,
      myInterval: {
        min: 0,
        max: 10,
        value: [4, 5],
      },
      clickMe: button(() => {
        console.log("ok")
      }),
      choice: { options: ["a", "b", "c"] },
    })

  return (
    <>
      // Should be about 1-2 ms
      {perfVisible ? <Perf position="top-left" /> : null}
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <mesh position={[position.x, position.y, position.z]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      <Cube scale={2} />
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}
