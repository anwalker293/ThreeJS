import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import imageSource from "../static/textures/door/color.jpg";

/**
 * Textures
 */
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.addEventListener("load", () => {
//   texture.needsUpdate = true;
// });
// image.src = "/textures/door/color.jpg";
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//   console.log("starting");
// };
// loadingManager.onLoad = () => {
//   console.log("finished loading");
// };
// loadingManager.onProgress = () => {
//   console.log("on progress");
// };
// loadingManager.onError = () => {
//   console.log("on error");
// };

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpeg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 2;
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping; // also THREE.MirroredRepeatWrapping
// Offset
// colorTexture.offset.x = 1;
// Rotation happens in bottom left corner
// colorTexture.rotation = Math.PI
// Can change this pivot
// colorTexture.center.x = 0.25
// colorTexture.center.y = 0.25
// We can send three functions after the path
// load - when the image loaded successfully
// progress - when the loading is progressing
// error - if something went wrong
const texture = textureLoader.load("/textures/door/color.jpeg");
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
