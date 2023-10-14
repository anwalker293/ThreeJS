import { useFrame } from '@react-three/fiber'
import { meshBounds, useGLTF, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    const cube = useRef()
    const hamburger = useGLTF("./hamburger.glb")
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    // -- onContextMenu --
    // - When the context menu should appear 
    // - ^Right click or Ctrl + Left Click

    // -- onDoubleClick --
    // -- onPointerUp --
    // - When we release the click (left or right) or touch
    // -- onPointerDown --
    // - When we've just clicked or put our finger down
    // -- onPointerOver & onPointerEnter --
    // - When the cursor or finger just weht above the object
    // - ^ Over will be triggered when entering an 
    //     object's children
    // - ^ Enter will only be triggered when entering
    //     the main object
    // -- onPointerMissed --
    // - When user clicks outside of the object

    const eventHandler = (event) => {
      // There's a whole bunch of properties in this
      // event object^^
      cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`) 
    }

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

       <mesh
          position-x={ - 2 }
          onClick={ (event) => event.stopPropagation() }
          onPointerEnter={ (event) => event.stopPropagation() }
        > 
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
          ref={ cube } 
          raycast={ meshBounds }
          position-x={ 2 } 
          scale={ 1.5 } 
          onClick={ eventHandler}
          onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
          onPointerLeave={() => { document.body.style.cursor = 'default' }}
        >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <primitive
          object= { hamburger.scene }
          scale= { 0.25 }
          position-y={ 0.5 }
          onClick={(event) => {
            console.log("clikc")
            event.stopPropagation()
          }}
        />


    </>
}
