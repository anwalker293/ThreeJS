import {
  MeshReflectorMaterial,
  Float,
  Text,
  Html,
  PivotControls,
  TransformControls,
  OrbitControls,
} from "@react-three/drei"
import { useRef } from "react"

export default function Experience() {
  const cube = useRef()
  const sphere = useRef()

  return (
    <>
      // enabledDumping={true} makes animation smother and we don't have to //
      // ask it to update itself on each frame
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        scale={100}
        fixed={true}
      >
        // Pivot controls doesn't work as a group like transformcontrols
        <mesh ref={sphere} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            wrapperClass="label"
            position={[1, 1, 0]}
            center
            distanceFactor={6}
            occlude={[sphere, cube]}
          >
            I'm in a sphere!!!
          </Html>
        </mesh>
      </PivotControls>
      <mesh ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cube} mode="translate" />
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        // <meshStandardMaterial color="greenyellow" />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1} // 0 is no blur
          mirror={0.75}
          color="greenyellow"
        />
      </mesh>
      <Html>Test</Html>
      // woff, tff, etc. prefer woff // Licenses! SIL Open Font License 1.1 or
      Apache
      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          color="salmon"
          position-y={2}
          maxWidth={2}
          textAlign="center"
        >
          I LOVE THIS
        </Text>
      </Float>
    </>
  )
}
