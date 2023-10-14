import * as THREE from "three"
import Experience from "../Experience.js"

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.setInstance()
    }

    setInstance() {
        const materialProps = {
            wireframe: true,
            color: 0xff0000,
        }

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshBasicMaterial(materialProps)
        )

        this.scene.add(mesh)
    }
}
