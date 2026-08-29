/**
 * Three.js 3D Hero Scene - Interactive Mechanical Wrench & Gear
 * FGC 2026 Platform - Team Colombia
 */

function initHero3D() {
  const container = document.getElementById('hero3dContainer');
  if (!container || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const width = container.clientWidth || 450;
  const height = container.clientHeight || 350;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffd700, 2.2); // Warm Gold Light
  keyLight.position.set(5, 8, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8); // Cyan Accent Light
  fillLight.position.set(-6, -4, 4);
  scene.add(fillLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
  backLight.position.set(0, 5, -8);
  scene.add(backLight);

  // Group for rotating interactive assembly
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Material: Metallic Titanium / Gold
  const wrenchMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.88,
    roughness: 0.18,
    envMapIntensity: 1.0
  });

  const goldAccentMat = new THREE.MeshStandardMaterial({
    color: 0xffb703,
    metalness: 0.92,
    roughness: 0.15
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.7,
    roughness: 0.4
  });

  // 1. Procedural Mechanical Wrench (Llave Inglesa)
  const wrenchGroup = new THREE.Group();

  // Wrench Handle (Shaft)
  const handleGeo = new THREE.BoxGeometry(0.7, 5.5, 0.35);
  const handleMesh = new THREE.Mesh(handleGeo, wrenchMat);
  wrenchGroup.add(handleMesh);

  // Handle Grip Inset
  const gripGeo = new THREE.BoxGeometry(0.45, 3.2, 0.38);
  const gripMesh = new THREE.Mesh(gripGeo, goldAccentMat);
  wrenchGroup.add(gripMesh);

  // Wrench Open Head (Top)
  const headOuterGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.4, 32);
  headOuterGeo.rotateX(Math.PI / 2);
  const headMesh = new THREE.Mesh(headOuterGeo, wrenchMat);
  headMesh.position.y = 3.0;
  wrenchGroup.add(headMesh);

  // Open Jaw Cutout (Simulation via dark block)
  const jawCutGeo = new THREE.BoxGeometry(0.8, 1.2, 0.5);
  const jawCutMesh = new THREE.Mesh(jawCutGeo, darkMetalMat);
  jawCutMesh.position.set(0, 3.25, 0);
  wrenchGroup.add(jawCutMesh);

  // Wrench Ring Head (Bottom)
  const ringOuterGeo = new THREE.TorusGeometry(0.9, 0.28, 16, 32);
  const ringMesh = new THREE.Mesh(ringOuterGeo, wrenchMat);
  ringMesh.position.y = -3.0;
  wrenchGroup.add(ringMesh);

  wrenchGroup.rotation.z = Math.PI / 4;
  wrenchGroup.scale.set(0.9, 0.9, 0.9);
  mainGroup.add(wrenchGroup);

  // 2. Precision Robotic Gear (Engranaje Robótico FGC)
  const gearGroup = new THREE.Group();
  const gearHubGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.3, 32);
  gearHubGeo.rotateX(Math.PI / 2);
  const gearHub = new THREE.Mesh(gearHubGeo, goldAccentMat);
  gearGroup.add(gearHub);

  const gearInnerHole = new THREE.CylinderGeometry(0.8, 0.8, 0.35, 16);
  gearInnerHole.rotateX(Math.PI / 2);
  const gearHole = new THREE.Mesh(gearInnerHole, darkMetalMat);
  gearGroup.add(gearHole);

  // Teeth for gear
  const numTeeth = 10;
  for (let i = 0; i < numTeeth; i++) {
    const angle = (i / numTeeth) * Math.PI * 2;
    const toothGeo = new THREE.BoxGeometry(0.4, 0.45, 0.3);
    const tooth = new THREE.Mesh(toothGeo, goldAccentMat);
    tooth.position.x = Math.cos(angle) * 1.95;
    tooth.position.y = Math.sin(angle) * 1.95;
    tooth.rotation.z = angle;
    gearGroup.add(tooth);
  }

  gearGroup.position.set(2.2, -1.2, -1.0);
  gearGroup.scale.set(0.75, 0.75, 0.75);
  mainGroup.add(gearGroup);

  // 3. Floating Ambient Particle Field (Sparks / Tech Atoms)
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 60;
  const posArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 16;
    posArray[i + 1] = (Math.random() - 0.5) * 14;
    posArray[i + 2] = (Math.random() - 0.5) * 10;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.12,
    color: 0xffd700,
    transparent: true,
    opacity: 0.65
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Mouse Parallax Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
  });

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth Lerp for Mouse Parallax
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Idle Floating and Rotation
    wrenchGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.35 + targetX * 0.6;
    wrenchGroup.rotation.x = Math.cos(elapsedTime * 0.6) * 0.25 - targetY * 0.6;
    wrenchGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.25;

    gearGroup.rotation.z = -elapsedTime * 0.5;
    gearGroup.position.y = -1.2 + Math.cos(elapsedTime * 1.0) * 0.15;

    particles.rotation.y = elapsedTime * 0.05;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive Resize
  window.addEventListener('resize', () => {
    if (!container) return;
    const newW = container.clientWidth || 450;
    const newH = container.clientHeight || 350;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHero3D();
});
