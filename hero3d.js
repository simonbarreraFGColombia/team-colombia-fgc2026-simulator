/**
 * Three.js Photorealistic 3D Hero Scene
 * Ultra-Realistic Industrial Adjustable Crescent Wrench & Precision Planetary Gear
 * FGC 2026 Platform - Team Colombia
 */

function initHero3D() {
  const container = document.getElementById('hero3dContainer');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const width = container.clientWidth || 450;
  const height = container.clientHeight || 340;

  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
  camera.position.set(0, 0, 15.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // ── High-End Studio Lighting ──
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambientLight);

  // Key Main Light (Brushed Steel Highlight)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(8, 14, 10);
  scene.add(keyLight);

  // Warm Gold Rim Light
  const goldRim = new THREE.DirectionalLight(0xffd700, 2.2);
  goldRim.position.set(-9, -6, 6);
  scene.add(goldRim);

  // Cool Cyan Tech Fill
  const cyanFill = new THREE.DirectionalLight(0x38bdf8, 1.3);
  cyanFill.position.set(2, 10, -8);
  scene.add(cyanFill);

  // ── Materials ──
  const chromeSteelMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.95,
    roughness: 0.14,
    envMapIntensity: 1.6
  });

  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.88,
    roughness: 0.32
  });

  const brassWormMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.9,
    roughness: 0.25
  });

  const goldGearMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.92,
    roughness: 0.2
  });

  const heroWorld = new THREE.Group();
  scene.add(heroWorld);

  // ═══════════════════════════════════════════════════════════
  // 1. ADJUSTABLE CRESCENT WRENCH (Llave Inglesa Clásica)
  // ═══════════════════════════════════════════════════════════
  const wrenchGroup = new THREE.Group();

  // (A) Handle Body with Chamfers and Hanging Hole
  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.42, -2.8);
  handleShape.lineTo(-0.5, 1.8);
  handleShape.quadraticCurveTo(-0.5, 2.1, -0.3, 2.2);
  handleShape.lineTo(0.3, 2.2);
  handleShape.quadraticCurveTo(0.5, 2.1, 0.5, 1.8);
  handleShape.lineTo(0.42, -2.8);
  handleShape.quadraticCurveTo(0.42, -3.2, 0.2, -3.2);
  handleShape.lineTo(-0.2, -3.2);
  handleShape.quadraticCurveTo(-0.42, -3.2, -0.42, -2.8);

  // Round Hanging Hole at bottom of handle
  const hangHole = new THREE.Path();
  hangHole.absarc(0, -2.7, 0.18, 0, Math.PI * 2, false);
  handleShape.holes.push(hangHole);

  const handleExtrude = {
    steps: 1,
    depth: 0.26,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 4
  };
  const handleMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(handleShape, handleExtrude), chromeSteelMat);
  handleMesh.position.z = -0.13;
  wrenchGroup.add(handleMesh);

  // Recessed Grip Inset Panel
  const gripPanel = new THREE.Mesh(new THREE.BoxGeometry(0.44, 3.2, 0.28), darkSteelMat);
  gripPanel.position.set(0, -0.5, 0);
  wrenchGroup.add(gripPanel);

  // (B) Main Fixed Head (Angled Jaw Body)
  const headShape = new THREE.Shape();
  headShape.moveTo(-0.4, 1.8);
  headShape.lineTo(-1.25, 2.9);
  headShape.lineTo(-1.25, 4.4);
  headShape.lineTo(-0.55, 4.4); // Fixed Jaw Tip
  headShape.lineTo(-0.55, 3.3); // Fixed Jaw Flat Clamping Face
  headShape.lineTo(0.65, 3.3);  // Throat Base
  headShape.lineTo(0.65, 4.3);  // Moveable Jaw side
  headShape.lineTo(1.15, 3.6);
  headShape.lineTo(0.6, 2.1);
  headShape.lineTo(0.35, 1.8);
  headShape.closePath();

  // Cavity for Knurled Worm Screw
  const wormCavity = new THREE.Path();
  wormCavity.moveTo(0.05, 2.3);
  wormCavity.lineTo(0.55, 2.3);
  wormCavity.lineTo(0.55, 2.9);
  wormCavity.lineTo(0.05, 2.9);
  wormCavity.closePath();
  headShape.holes.push(wormCavity);

  const headExtrude = {
    steps: 1,
    depth: 0.36,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.07,
    bevelSegments: 5
  };
  const headMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(headShape, headExtrude), chromeSteelMat);
  headMesh.position.z = -0.18;
  wrenchGroup.add(headMesh);

  // (C) Moveable Jaw (Mandíbula Deslizante)
  const moveableJawGeo = new THREE.BoxGeometry(0.38, 1.1, 0.32);
  const moveableJaw = new THREE.Mesh(moveableJawGeo, chromeSteelMat);
  moveableJaw.position.set(0.35, 3.8, 0);
  wrenchGroup.add(moveableJaw);

  // (D) Knurled Brass Worm Adjustment Screw (Tornillo Sinfín)
  const wormGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.55, 24);
  const wormMesh = new THREE.Mesh(wormGeo, brassWormMat);
  wormMesh.position.set(0.3, 2.6, 0);
  wormMesh.rotation.z = Math.PI / 2;
  wrenchGroup.add(wormMesh);

  // Position wrench in scene
  wrenchGroup.position.set(-1.8, 0.2, 0.4);
  wrenchGroup.rotation.set(0.35, -0.2, Math.PI / 4);
  wrenchGroup.scale.set(0.88, 0.88, 0.88);
  heroWorld.add(wrenchGroup);

  // ═══════════════════════════════════════════════════════════
  // 2. PRECISION INDUSTRIAL HELICAL GEAR (Engranaje)
  // ═══════════════════════════════════════════════════════════
  const gearGroup = new THREE.Group();
  const numTeeth = 12;
  const outerR = 1.85;
  const innerR = 1.45;
  const gearShape = new THREE.Shape();
  const step = (Math.PI * 2) / numTeeth;

  for (let i = 0; i < numTeeth; i++) {
    const a = i * step;
    const p1 = a;
    const p2 = a + step * 0.25;
    const p3 = a + step * 0.55;
    const p4 = a + step * 0.85;

    const x1 = Math.cos(p1) * innerR;
    const y1 = Math.sin(p1) * innerR;
    const x2 = Math.cos(p2) * outerR;
    const y2 = Math.sin(p2) * outerR;
    const x3 = Math.cos(p3) * outerR;
    const y3 = Math.sin(p3) * outerR;
    const x4 = Math.cos(p4) * innerR;
    const y4 = Math.sin(p4) * innerR;

    if (i === 0) gearShape.moveTo(x1, y1);
    else gearShape.lineTo(x1, y1);
    gearShape.lineTo(x2, y2);
    gearShape.lineTo(x3, y3);
    gearShape.lineTo(x4, y4);
  }
  gearShape.closePath();

  // Central Hub Hole
  const centerHole = new THREE.Path();
  centerHole.absarc(0, 0, 0.58, 0, Math.PI * 2, false);
  gearShape.holes.push(centerHole);

  // 3 Lightening Cutouts
  for (let k = 0; k < 3; k++) {
    const holeAngle = (k / 3) * Math.PI * 2;
    const h = new THREE.Path();
    h.absarc(Math.cos(holeAngle) * 1.0, Math.sin(holeAngle) * 1.0, 0.2, 0, Math.PI * 2, false);
    gearShape.holes.push(h);
  }

  const gearExtrude = {
    steps: 1,
    depth: 0.35,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 4
  };
  const gearMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(gearShape, gearExtrude), goldGearMat);
  gearMesh.position.z = -0.17;
  gearGroup.add(gearMesh);

  // Axle Shaft Collar
  const collarMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.45, 32), darkSteelMat);
  collarMesh.rotation.x = Math.PI / 2;
  gearGroup.add(collarMesh);

  // Position gear cleanly separated on the right (NO collision)
  gearGroup.position.set(2.8, -1.0, -0.6);
  gearGroup.rotation.set(-0.2, 0.3, 0);
  gearGroup.scale.set(0.85, 0.85, 0.85);
  heroWorld.add(gearGroup);

  // ═══════════════════════════════════════════════════════════
  // 3. AMBIENT PARTICLES & INTERACTION
  // ═══════════════════════════════════════════════════════════
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 40;
  const posArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 18;
    posArray[i + 1] = (Math.random() - 0.5) * 14;
    posArray[i + 2] = (Math.random() - 0.5) * 10;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.14,
    color: 0xffd700,
    transparent: true,
    opacity: 0.5
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

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

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Independent smooth floating motion
    wrenchGroup.rotation.y = -0.2 + Math.sin(elapsedTime * 0.65) * 0.22 + targetX * 0.4;
    wrenchGroup.rotation.x = 0.35 + Math.cos(elapsedTime * 0.5) * 0.16 - targetY * 0.4;
    wrenchGroup.position.y = 0.2 + Math.sin(elapsedTime * 1.0) * 0.16;

    // Worm screw slight rotation effect
    wormMesh.rotation.x = elapsedTime * 1.5;

    gearGroup.rotation.z = elapsedTime * 0.3;
    gearGroup.rotation.y = 0.3 + Math.sin(elapsedTime * 0.55) * 0.12 + targetX * 0.25;
    gearGroup.position.y = -1.0 + Math.cos(elapsedTime * 0.85) * 0.12;

    particles.rotation.y = elapsedTime * 0.03;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    if (!container) return;
    const newW = container.clientWidth || 450;
    const newH = container.clientHeight || 340;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHero3D();
});
