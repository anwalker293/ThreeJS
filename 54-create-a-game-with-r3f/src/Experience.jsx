import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Level, BlockSpinner } from "./Level.jsx"
import Lights from './Lights.jsx'
import Player from "./Player.jsx"

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />

        <Physics debug>
          <Lights />
          <Level /> 
          <Player />
        </Physics>
    </>
}
