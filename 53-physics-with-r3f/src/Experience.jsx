import { useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics } from "@react-three/rapier"
import { useMemo, useEffect, useState, useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export default function Experience()
{
    // const [ hitSound ] = useState(() => {
    //   new Audio("./hit.mp3")
    // })
    // const cube = useRef()
    // // const cubes = useRef()
    // const cubesCount = 3
    // const twister = useRef()
    // // -- addForce --
    // // - Used to apply a force that lasts for quite a long time
    // // (e.g. wind)
    // // -- applyImpulse --
    // // - Used to apply a force for a very short period of time
    // // (e.g. projectile)
    // const cubeJump = () => {
    //   cube.current.applyImpulse({x:0, y:5, z:0})
    //   cube.current.applyTorqueImpulse({
    //     x: Math.random() - 0.5,
    //     y: Math.random() - 0.5,
    //     z: Math.random() - 0.5
    //   })
    // }

    // -- 4 different events --
    // onCollisionEnter - when the RigidBody hit something
    // onCollisionExit - when the RigidBody separates from the
    //                    object it just hit
    // onSleep - when the RigidBody starts sleeping
    // onWake - when the RigidBody stops sleeping
    
    // useFrame((state) => {
    //   const time = state.clock.getElapsedTime()
    //   const eulerRotation = new THREE.Euler(0, time*3, 0)
    //   const quaternionRotation = new THREE.Quaternion()
    //   quaternionRotation.setFromEuler(eulerRotation)
    //   twister.current.setNextKinematicRotation(quaternionRotation) 
    //   const angle = time * 0.5;
    //   const x = Math.cos(angle);
    //   const z = Math.sin(angle);
    //   twister.current.setNextKinematicTranslation({x: x, y: -0.8, z:z})
    // })
      
    {/* const collisionEnter = () => {
      hitSound.currentTime = 0
      hitSound.volume = Math.random()
      hitSound.play()
    } */}

    const hamburger = useGLTF("./hamburger.glb")

        // Matrix4 combo of postition, rotation, and scale
        {/* useEffect(() => {
          for (let i = 0; i < cubesCount; i++) {
            const matrix = new THREE.Matrix4()
            matrix.compose(
              new THREE.Vector3(i * 2, 0, 0),
              new THREE.Quaternion(),
              new THREE.Vector3(1, 1, 1)
            )
            cubes.current.setMatrixAt(i, matrix)
          }
        }, []) */}

        {/* const instances = useMemo(() => {
            const instances = []

            for(let i = 0; i < cubesCount; i++)
            {
                instances.push({
                    key: 'instance_' + i,
                    position: [ i * 2, 0, 0 ],
                    rotation: [ 0, 0, 0 ],
                })
            }

            return instances
        }, []) */}
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
            onCollisionEnter={ collisionEnter }
            // onCollisionExit={() => (console.log("exit"))}
            // onSleep={() => (console.log("sleep"))}
            // onWake={() => {console.log("wake")}}
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

          <RigidBody colliders={false} position={[0, 4, 0]}>
            <primitive object={hamburger.scene} scale={0.25} />
            <CylinderCollider args={[0.5, 1.25]} />
          </RigidBody>


          <RigidBody type="fixed">
            <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, 5.5 ] } />
            <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, - 5.5 ] } />
            <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ 5.5, 1, 0 ] } />
            <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ - 5.5, 1, 0 ] } />
          </RigidBody>        
          
          <InstancedRigidBodies instances={instances}>
            <instancedMesh castShadow receiveShadow args={ [ null, null, cubesCount ] }>
              <boxGeometry />
              <meshStandardMaterial color="tomato" />
            </instancedMesh>
          </InstancedRigidBodies> 
    </Physics>

        

    </>
}
