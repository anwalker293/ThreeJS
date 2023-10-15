import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { BallCollider, CuboidCollider, RigidBody, Physics } from "@react-three/rapier"
import { useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export default function Experience()
{
    const cube = useRef()
    const twister = useRef()
    // -- addForce --
    // - Used to apply a force that lasts for quite a long time
    // (e.g. wind)
    // -- applyImpulse --
    // - Used to apply a force for a very short period of time
    // (e.g. projectile)
    const cubeJump = () => {
      cube.current.applyImpulse({x:0, y:5, z:0})
      cube.current.applyTorqueImpulse({
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5
      })
    }
    
    useFrame((state) => {
      const time = state.clock.getElapsedTime()
      const eulerRotation = new THREE.Euler(0, time, 0)
      const quaternionRotation = new THREE.Quaternion()
      quaternionRotation.setFromEuler(eulerRotation)
      twister.current.setNextKinematicRotation(quaternionRotation) 
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics gravity={[0, -9.81, 0]} debug>
          <RigidBody colliders="ball">
            <mesh castShadow position={ [ -1.5, 2, 0 ] }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
          </RigidBody>

          {/* <RigidBody colliders="trimesh" position={ [ 0, 1, - 0.25 ] } rotation={ [ Math.PI * 0.1, 0, 0 ] }>
            // <BallCollider args={ [ 1.5 ] } />
            // <CuboidCollider args={ [ 1.5, 1.5, 0.5 ] } />
            // <CuboidCollider args={ [ 0.25, 1, 0.25 ] } position={ [ 0, 0, 1 ] } rotation={ [ - Math.PI * 0.35, 0, 0 ] } /> 
            <mesh castShadow>
              <torusGeometry args={ [ 1, 0.5, 16, 32 ] } />
              <meshStandardMaterial color="mediumpurple" />
            </mesh>
          </RigidBody> */} 

          <RigidBody 
            ref={cube} 
            position={ [ 1.5, 2, 0 ] }
            gravityScale={ 1 }
            restitution={ 0 }
            friction={ 0.7 }
            colliders={ false }
          >
            <mesh castShadow onClick={ cubeJump }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <CuboidCollider mass={ 2 } args={[0.5, 0.5, 0.5]} />
          </RigidBody>

          <RigidBody type="fixed" restitution={1} friction={0}>
            <mesh receiveShadow position-y={ - 1.25 }>
                <boxGeometry args={ [ 10, 0.5, 10 ] } />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>

          <RigidBody
            ref={ twister }
            position={ [ 0, - 0.8, 0 ] }
            friction={ 0 }
            type="kinematicPosition"
          >
            <mesh castShadow scale={ [ 0.4, 0.4, 3 ] }>
              <boxGeometry />
              <meshStandardMaterial color="red" />
            </mesh>
          </RigidBody> 
        </Physics>

    </>
}
