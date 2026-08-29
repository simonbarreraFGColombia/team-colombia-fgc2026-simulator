/**
 * Three.js Photorealistic 3D Hero Scene
 * Ultra-Realistic Industrial Combination Wrench & Precision Helical Gear
 * FGC 2026 Platform - Team Colombia
 */

function initHero3D() {
  const container = document.getElementById('hero3dContainer');
  if (!container || typeof THREE === 'undefined') return;

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const width = container.clientWidth || 450;
  const height = container.clientHeight || 340;

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 0, 16);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // 2. High-End Studio Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Key Studio Light (Warm Titanium Reflection)
  const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.4);
  keyLight.position.set(8, 12, 10);
  scene.add(keyLight);

  // Gold Fill Light (Team Colombia Yellow/Gold Rim)
  const goldRim = new THREE.DirectionalLight(0xffd700, 2.0);
  goldRim.position.set(-8, -6, 6);
  scene.add(goldRim);

  // Cool Cyan Tech Reflection
  const cyanFill = new THREE.DirectionalLight(0x38bdf8, 1.4);
  cyanFill.position.set(0, 10, -8);
  scene.add(cyanFill);

  // Bottom Soft Bounce
  const bottomBounce = new THREE.DirectionalLight(0xe2e8f0, 0.8);
  bottomBounce.position.set(0, -10, 4);
  scene.add(bottomBounce);

  // 3. Materials: Chrome-Vanadium Steel & Golden Aerospace Brass
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.96,
    roughness: 0.14,
    envMapIntensity: 1.5
  });

  const chromeDarkMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    metalness: 0.85,
    roughness: 0.35
  });

  const goldBrassMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.92,
    roughness: 0.22
  });

  const darkShaftMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.3
  });

  // 4. Group Hierarchy (Non-colliding positioning)
  const heroWorld = new THREE.Group();
  scene.add(heroWorld);

  // ═══════════════════════════════════════════════════════════
  // 5. PHOTOREALISTIC COMBINATION WRENCH (Llave Inglesa / Mixta)
  // ═══════════════════════════════════════════════════════════
  const wrenchGroup = new THREE.Group();

  // (A) Wrench Handle Beam (I-Beam with ergonomic tapered profile)
  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.4, -2.4);
  handleShape.lineTo(-0.48, 2.4);
  handleShape.quadraticCurveTo(-0.48, 2.7, -0.3, 2.7);
  handleShape.lineTo(0.3, 2.7);
  handleShape.quadraticCurveTo(0.48, 2.7, 0.48, 2.4);
  handleShape.lineTo(0.4, -2.4);
  handleShape.quadraticCurveTo(0.4, -2.7, 0.25, -2.7);
  handleShape.lineTo(-0.25, -2.7);
  handleShape.quadraticCurveTo(-0.4, -2.7, -0.4, -2.4);

  const extrudeSettingsHandle = {
    steps: 1,
    depth: 0.28,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 4
  };
  const handleMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(handleShape, extrudeSettingsHandle), chromeMat);
  handleMesh.position.z = -0.14;
  wrenchGroup.add(handleMesh);

  // Recessed center panel on handle (Realistic drop-forged look)
  const grooveGeo = new THREE.BoxGeometry(0.4, 3.8, 0.32);
  const grooveMesh = new THREE.Mesh(grooveGeo, chromeDarkMat);
  wrenchGroup.add(grooveMesh);

  // (B) Open-End Jaw (Top End with 15° realistic offset angle)
  const jawOuterShape = new THREE.Shape();
  jawOuterShape.absarc(0, 0, 1.25, 0, Math.PI * 2, false);
  
  // Cutout throat for open jaw
  const jawThroatHole = new THREE.Path();
  jawThroatHole.moveTo(-0.55, 1.4);
  jawThroatHole.lineTo(-0.55, 0.1);
  jawThroatHole.lineTo(0, -0.45);
  jawThroatHole.lineTo(0.55, 0.1);
  jawThroatHole.lineTo(0.55, 1.4);
  jawThroatHole.lineTo(-0.55, 1.4);
  jawOuterShape.holes.push(jawThroatHole);

  const jawExtrudeSettings = {
    steps: 1,
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.08,
    bevelSegments: 5
  };
  const jawMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(jawOuterShape, jawExtrudeSettings), chromeMat);
  jawMesh.position.set(0, 3.2, -0.17);
  jawMesh.rotation.z = Math.PI * (15 / 180); // Standard 15 degree mechanical offset
  wrenchGroup.add(jawMesh);

  // (C) Closed 12-Point Box Ring (Bottom End)
  const ringOuterShape = new THREE.Shape();
  ringOuterShape.absarc(0, 0, 1.05, 0, Math.PI * 2, false);

  // 12-point broached star hole
  const starHole = new THREE.Path();
  const starPoints = 12;
  const outerR = 0.65;
  const innerR = 0.56;
  for (let i = 0; i < starPoints * 2; i++) {
    const angle = (i / (starPoints * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) starHole.moveTo(x, y);
    else starHole.lineTo(x, y);
  }
  starHole.closePath();
  ringOuterShape.holes.push(starHole);

  const ringMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(ringOuterShape, jawExtrudeSettings), chromeMat);
  ringMesh.position.set(0, -3.2, -0.17);
  wrenchGroup.add(ringMesh);

  // Position wrench in scene
  wrenchGroup.position.set(-1.6, 0.2, 0.5);
  wrenchGroup.rotation.set(0.3, -0.2, Math.PI / 4.2);
  wrenchGroup.scale.set(0.85, 0.85, 0.85);
  heroWorld.add(wrenchGroup);

  // ═══════════════════════════════════════════════════════════
  // 6. PRECISION HELICAL ROBOTIC GEAR (Engranaje Industrial)
  // ═══════════════════════════════════════════════════════════
  const gearGroup = new THREE.Group();

  // (A) Gear Main Body & Hub
  const gearShape = new THREE.Shape();
  const numTeeth = 14;
  const toothOuterR = 1.95;
  const toothRootR = 1.55;
  const toothWidthAngle = (Math.PI * 2) / numTeeth;

  for (let i = 0; i < numTeeth; i++) {
    const baseAngle = i * toothWidthAngle;
    const p1 = baseAngle;
    const p2 = baseAngle + toothWidthAngle * 0.25;
    const p3 = baseAngle + toothWidthAngle * 0.55;
    const p4 = baseAngle + toothWidthAngle * 0.85;

    // Root to Tip
    const x1 = Math.cos(p1) * toothRootR;
    const y1 = Math.sin(p1) * toothRootR;
    const x2 = Math.cos(p2) * toothOuterR;
    const y2 = Math.sin(p2) * toothOuterR;
    const x3 = Math.cos(p3) * toothOuterR;
    const y3 = Math.sin(p3) * toothOuterR;
    const x4 = Math.cos(p4) * toothRootR;
    const y4 = Math.sin(p4) * toothRootR;

    if (i === 0) gearShape.moveTo(x1, y1);
    else gearShape.lineTo(x1, y1);
    gearShape.lineTo(x2, y2);
    gearShape.lineTo(x3, y3);
    gearShape.lineTo(x4, y4);
  }
  gearShape.closePath();

  // Center Shaft Hole & Keyway
  const shaftHole = new THREE.Path();
  shaftHole.absarc(0, 0, 0.65, 0, Math.PI * 2, false);
  gearShape.holes.push(shaftHole);

  // 4 Weight-reduction lightening cutouts
  for (let k = 0; k < 4; k++) {
    const cutoutAngle = (k / 4) * Math.PI * 2 + Math.PI / 4;
    const hole = new THREE.Path();
    hole.absarc(Math.cos(cutoutAngle) * 1.1, Math.sin(cutoutAngle) * 1.1, 0.22, 0, Math.PI * 2, false);
    gearShape.holes.push(hole);
  }

  const gearExtrude = {
    steps: 2,
    depth: 0.38,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.08,
    bevelSegments: 4
  };

  const gearMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(gearShape, gearExtrude), goldBrassMat);
  gearMesh.position.z = -0.19;
  gearGroup.add(gearMesh);

  // Inner Dark Center Axle Collar
  const axleCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.5, 32), darkShaftMat);
  axleCollar.rotation.x = Math.PI / 2;
  gearGroup.add(axleCollar);

  // Position gear cleanly separated on the right (NO collision)
  gearGroup.position.set(2.8, -1.0, -0.6);
  gearGroup.rotation.set(-0.25, 0.35, 0);
  gearGroup.scale.set(0.85, 0.85, 0.85);
  heroWorld.add(gearGroup);

  // ═══════════════════════════════════════════════════════════
  // 7. AMBIENT TECH PARTICLES (Floating Precision Atoms)
  // ═══════════════════════════════════════════════════════════
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 45;
  const posArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 18;
    posArray[i + 1] = (Math.random() - 0.5) * 14;
    posArray[i + 2] = (Math.random() - 0.5) * 10;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.15,
    color: 0xffd700,
    transparent: true,
    opacity: 0.5
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ═══════════════════════════════════════════════════════════
  // 8. INTERACTIVE PARALLAX & ANIMATION LOOP
  // ═══════════════════════════════════════════════════════════
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

    // Smooth Lerp for Cursor Movement
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Independent smooth floating motion (NO overlapping)
    wrenchGroup.rotation.y = -0.2 + Math.sin(elapsedTime * 0.7) * 0.25 + targetX * 0.45;
    wrenchGroup.rotation.x = 0.3 + Math.cos(elapsedTime * 0.5) * 0.18 - targetY * 0.45;
    wrenchGroup.position.y = 0.2 + Math.sin(elapsedTime * 1.1) * 0.18;

    gearGroup.rotation.z = elapsedTime * 0.35;
    gearGroup.rotation.y = 0.35 + Math.sin(elapsedTime * 0.6) * 0.15 + targetX * 0.3;
    gearGroup.position.y = -1.0 + Math.cos(elapsedTime * 0.9) * 0.14;

    particles.rotation.y = elapsedTime * 0.04;

    renderer.render(scene, camera);
  }

  animate();

  // Window Resize Handling
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
