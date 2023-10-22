import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/**
 * Stats
 */
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const displacementTexture = textureLoader.load('/textures/displacementMap.png')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance',
    antialias: true
})
renderer.useLegacyLights = false
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

/**
 * Test meshes
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial()
)
cube.castShadow = true
cube.receiveShadow = true
cube.position.set(- 5, 0, 0)
scene.add(cube)

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 128, 32),
    new THREE.MeshStandardMaterial()
)
torusKnot.castShadow = true
torusKnot.receiveShadow = true
scene.add(torusKnot)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
)
sphere.position.set(5, 0, 0)
sphere.castShadow = true
sphere.receiveShadow = true
scene.add(sphere)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial()
)
floor.position.set(0, - 2, 0)
floor.rotation.x = - Math.PI * 0.5
floor.castShadow = true
floor.receiveShadow = true
scene.add(floor)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, 2.25)
scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    stats.begin()

    const elapsedTime = clock.getElapsedTime()

    // Update test mesh
    torusKnot.rotation.y = elapsedTime * 0.1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    stats.end()
}

tick()

/**
 * Tips
 */

// // Tip 4
// console.log(renderer.info)

// // Tip 6
// scene.remove(cube)
// cube.geometry.dispose()
// cube.material.dispose()

// Tip 7
// If you can, avoid lights
// Prefer: Use baked lights or cheap lights (e.g. 
//   AmbientLight, DirectionalLight, HemisphereLight)

// Tip 8
// Avoid adding or removing lights from the scene

// Tip 9
// Avoid shadows, use baked shadows

// // Tip 10 - Optimize shadow maps
// Make sure the shadow maps fit perfectly with the scene
// directionalLight.shadow.camera.top = 3
// directionalLight.shadow.camera.right = 6
// directionalLight.shadow.camera.left = - 6
// directionalLight.shadow.camera.bottom = - 3
// directionalLight.shadow.camera.far = 10
// directionalLight.shadow.mapSize.set(1024, 1024)

// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(cameraHelper)

// // Tip 11
// Use castShadow and receiveShadow wisely
// cube.castShadow = true
// cube.receiveShadow = false

// torusKnot.castShadow = true
// torusKnot.receiveShadow = false

// sphere.castShadow = true
// sphere.receiveShadow = false

// floor.castShadow = false
// floor.receiveShadow = true

// // Tip 12
// Deactivate shadow auto update
// Update shadow maps only when necessary
// renderer.shadowMap.autoUpdate = false
// renderer.shadowMap.needsUpdate = true

// Tip 13
// Textures take a lot of space in the GPU memory esp. w/ mipmaps
// The texture file weight has nothing to do with that,
//   and only the resolution matters
// Try to reduce the resolution to the minimum while keeping
//   a decent result

// Tip 14
// Keep a power of 2 resolution for mipmaps

// Tip 15
// Use the right format (e.g. .jpg vs .png)
// + tinypng or equiv
// You can also try the basis format ^
// Basis is a format just like .jpg and .png but the
//   compression is powerful, and the format can be read
//   by the GPU more easily
// ^ Unfortunately, it can be hard to generate and it's a 
//   lossy compression

// Tip 17
// Do not update vertices

// // Tip 18
// Mutualize geometries
// If you have multiple Meshes using the same geometry shape,
//   create only one geometry and use it on all of the meshes
// for(let i = 0; i < 50; i++)
// {
//     const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

//     const material = new THREE.MeshNormalMaterial()
    
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 19
// // Merge geometries
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// const material = new THREE.MeshNormalMaterial()

// for(let i = 0; i < 50; i++)
// {
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 20
// Mutualize materials
// Like for the geometries, if you are using the same type
// of material for multiple meshes, try to create only one
// and use it multiple times
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    
// for(let i = 0; i < 50; i++)
// {
//     const material = new THREE.MeshNormalMaterial()

//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 22
// Use instance mesh
// It's like a mesh, but you create only one InstancedMesh,
//   and provide a transformation matrix for each "instance"
//   of that mesh
// The matrix has to be a Matrix4, and you can apply any
//   transformation by using the various available methods

// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// const material = new THREE.MeshNormalMaterial()
// const mesh = new THREE.Mesh(geometry, material)

// for(let i = 0; i < 50; i++)
// {
    // const position = new THREE.Vector3(
    //   (Math.random() - 0.5) * 10,
    //   (Math.random() - 0.5) * 10,
    //   (Math.random() - 0.5) * 10,
    // )
    // const quaternion = new THREE.Quaterion()
    // quaterion.setFromEuler(new THREE.Euler(
    //   (Math.random() - 0.5) * Math.PI * 2,
    //   (Math.random() - 0.5) * Math.PI * 2,
    // ))
    // const matrix = new THREE.Matrix4()
    // matrix.makeRotationFromQuaternion(quaternion)
    // matrix.setPosition(position)
    // mesh.setMatrix(i, matrix)
//     // mesh.position.x = (Math.random() - 0.5) * 10
//     // mesh.position.y = (Math.random() - 0.5) * 10
//     // mesh.position.z = (Math.random() - 0.5) * 10
//     // mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     // mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// Tip 23
// Low polygons

// Tip 24 - Draco Compression
// If the model has a lot of details with complex geometries,
//   try and use DracoCompression

// Tip 25
// Most servers don't gzip files such as .glb, .gltf, .obj, etc.
// See if you can figure out how to fix that

// Tip 26
// When objects are not in the FOV, they won't be rendered
// If you can reduce the camera FOV, do it

// Tip 27
// Reduce near and far vars ^

// // Tip 29
// Limit pixel ratio
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Tip 30
// Some devices may be able to switch between diff GPU 
//   or diff GPU usages
// We can give a hint on what power is required when instantiating the WebGLRenderer by specifying a powerPreference property
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   powerPreference: 'high-performance'
// })

// Tip 31
// Default antialias is performant, but less performant
//  than no antialias

// Tip 32
// Limit passes (e.g. merge together if you can)

// Tip 33
// Specify the precision 
// You can force the precision of the shaders in the
// materials by changing their precision property
// const shaderMaterial = new THREE.ShaderMaterial({
//   precision: 'lowp'
// })

// Tip 34
// Keep code simple
// e.g. clamp

// Tip 35
// Use defines
// Directly in the shader code:
// #define uDisplacementStrength 1.5
// Or in the defines property of the ShaderMaterial
// const shaderMaterial = new THREE.ShaderMaterial({
//   defines: {
//     uDisplacementStrength: 1.5
//   }
// })

// Tip 36
// Do the calculations in the vertex shader
// If possible, do the calculations in the vertex shader
// and send the result to the fragment shader

// // Tip 31, 32, 34 and 35
// 33 - specify the precision
// 
// const shaderGeometry = new THREE.PlaneGeometry(10, 10, 256, 256)

// const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms:
//     {
//         uDisplacementTexture: { value: displacementTexture },
//         uDisplacementStrength: { value: 1.5 }
//     },
//     vertexShader: `
//         uniform sampler2D uDisplacementTexture;
//         uniform float uDisplacementStrength;

//         varying vec2 vUv;

//         void main()
//         {
//             vec4 modelPosition = modelMatrix * vec4(position, 1.0);

//             float elevation = texture2D(uDisplacementTexture, uv).r;
//             if(elevation < 0.5)
//             {
//                 elevation = 0.5;
//             }

//             modelPosition.y += elevation * uDisplacementStrength;

//             gl_Position = projectionMatrix * viewMatrix * modelPosition;

//             vUv = uv;
//         }
//     `,
//     fragmentShader: `
//         uniform sampler2D uDisplacementTexture;

//         varying vec2 vUv;

//         void main()
//         {
//             float elevation = texture2D(uDisplacementTexture, vUv).r;
//             if(elevation < 0.25)
//             {
//                 elevation = 0.25;
//             }

//             vec3 depthColor = vec3(1.0, 0.1, 0.1);
//             vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
//             vec3 finalColor = vec3(0.0);
//             finalColor.r += depthColor.r + (surfaceColor.r - depthColor.r) * elevation;
//             finalColor.g += depthColor.g + (surfaceColor.g - depthColor.g) * elevation;
//             finalColor.b += depthColor.b + (surfaceColor.b - depthColor.b) * elevation;

//             gl_FragColor = vec4(finalColor, 1.0);
//         }
//     `
// })

// const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
// shaderMesh.rotation.x = - Math.PI * 0.5
// scene.add(shaderMesh)
