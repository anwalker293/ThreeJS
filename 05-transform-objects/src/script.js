import * as THREE from "three";
import "./style.css";
import gsap from "gsap";

// The purpose of `requestAnimationFrame` is to
// call the function provided on the next frame
// We are going to call the same function on
// each new frame

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Time
let time = Date.now();

// Clock
const clock = new THREE.Clock();

// Move right
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// Move left
gsap.to(mesh.position, { duration: 1, delay: 1, x: 0 });

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  mesh.rotation.y = elapsedTime * Math.PI * 2; // one rotation per second
  // Up and down
  mesh.position.y = Math.sin(elapsedTime);
  // can also do cosx to make it go in circles

  // Can also do this to the camera
  // camera.position.y = Math.sin(elapsedTime)
  // camera.position.x = Math.cos(elapsedTime)
  // camera.lookAt(mesh.position)

  // Time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // Update objects
  // mesh.position.x += 0.01;
  // mesh.rotation.x += 0.01;
  //mesh.rotation.y += 0.01;
  // mesh.rotation.y += 0.001 * deltaTime;

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
