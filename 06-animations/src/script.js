import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
  },
};

// Debug
// There are different types of elements you can add to that panel
// Range - for numbers with min and max value
// Color -
// Text - for simple texts
// Checkbox - for bools (true or false)
// Select - for a choice from a list of values
// Button - to trigger functions
// Folder - to organize your panel if you have too many elements
const gui = new dat.GUI();

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;

  console.log(cursor.x, cursor.y);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
const geometry = new THREE.BufferGeometry();
// Creating a bunch of triangles
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random() - 0.5;
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);
// geometry.setAttribute("position", positionsAttribute);
//const positionsArray = new Float32Array(9);
// - Vertex 1 -
// positionsArray[0] = 0; // x
// positionsArray[1] = 0; // y
// positionsArray[2] = 0; // z
//
// positionsArray[3] = 0;
// positionsArray[4] = 1;
// positionsArray[5] = 0;
//
// positionsArray[6] = 1;
// positionsArray[7] = 0;
// positionsArray[8] = 0;

// Object
// 6 parameters for geometry
// width: the size on the x axis
// height: the size on the y axis
// depth: ...z axis
// widthSegments: how many subdivisions in the x axis
// heightSegments: how many subdivisions in the x axis
// depthSegments: ... z axis
// const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug
// The next parameters handle
// min, max, step (or handle)
//gui.add(mesh.position, "y", -3, 3, 0.01);
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});
gui.add(parameters, "spin");
// Sizes
const sizes = {
  width: window.innerWidth,
  // width: 800,
  height: window.innerHeight,
  // height: 600,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});

// Full Screen
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// -- Camera --
// - Perspective Camera -
// 1. Field of View (vertical vision angle) (recommended between 45 and 75)
// 2. Aspect ratio
// 3. Near - Any object or part of the object closer than near or further
//           than far will not show up
//           Do not use extreme values to present z-fighting
// 4. Far
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// - Orthographic Camera -
// Instead of FOV, we provide how far the camera can see in each direction
// (left, right, top, and bottom)
// Then the near and far
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false;
controls.enableDamping = true;
// controls.target.y = 1
// controls.update()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Time
let time = Date.now();

// Clock
const clock = new THREE.Clock();

// Clock

// Animate
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.y * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
