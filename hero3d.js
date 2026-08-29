/**
 * Three.js Photorealistic 3D Hero Scene
 * Industrial Adjustable Crescent Wrench, Precision Planetary Gear & Volumetric GLSL Fire Flames
 * FGC 2026 Platform - Igniting Innovation - Team Colombia
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

  // ── Studio & Dynamic Fire Lighting ──
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(8, 14, 10);
  scene.add(keyLight);

  const goldRim = new THREE.DirectionalLight(0xffaa00, 2.0);
  goldRim.position.set(-9, -6, 6);
  scene.add(goldRim);

  // Flickering Deep Fire Point Lights (Backlight & Rim Glow on Mechanical Tools)
  const fireLight = new THREE.PointLight(0xff4500, 5.2, 22, 1.3);
  fireLight.position.set(0.2, 0.0, -3.8);
  scene.add(fireLight);

  const fireInnerLight = new THREE.PointLight(0xffd700, 3.8, 14, 1.6);
  fireInnerLight.position.set(0.2, 0.5, -3.2);
  scene.add(fireInnerLight);

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
  // 1. ADJUSTABLE CRESCENT WRENCH (Llave Inglesa) - Foreground Z: +0.4
  // ═══════════════════════════════════════════════════════════
  const wrenchGroup = new THREE.Group();

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

  const gripPanel = new THREE.Mesh(new THREE.BoxGeometry(0.44, 3.2, 0.28), darkSteelMat);
  gripPanel.position.set(0, -0.5, 0);
  wrenchGroup.add(gripPanel);

  const headShape = new THREE.Shape();
  headShape.moveTo(-0.4, 1.8);
  headShape.lineTo(-1.25, 2.9);
  headShape.lineTo(-1.25, 4.4);
  headShape.lineTo(-0.55, 4.4);
  headShape.lineTo(-0.55, 3.3);
  headShape.lineTo(0.65, 3.3);
  headShape.lineTo(0.65, 4.3);
  headShape.lineTo(1.15, 3.6);
  headShape.lineTo(0.6, 2.1);
  headShape.lineTo(0.35, 1.8);
  headShape.closePath();

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

  const moveableJawGeo = new THREE.BoxGeometry(0.38, 1.1, 0.32);
  const moveableJaw = new THREE.Mesh(moveableJawGeo, chromeSteelMat);
  moveableJaw.position.set(0.35, 3.8, 0);
  wrenchGroup.add(moveableJaw);

  const wormGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.55, 24);
  const wormMesh = new THREE.Mesh(wormGeo, brassWormMat);
  wormMesh.position.set(0.3, 2.6, 0);
  wormMesh.rotation.z = Math.PI / 2;
  wrenchGroup.add(wormMesh);

  wrenchGroup.position.set(-2.2, 0.2, 0.4);
  wrenchGroup.rotation.set(0.35, -0.2, Math.PI / 4);
  wrenchGroup.scale.set(0.85, 0.85, 0.85);
  heroWorld.add(wrenchGroup);

  // ═══════════════════════════════════════════════════════════
  // 2. PRECISION INDUSTRIAL HELICAL GEAR (Engranaje) - Midground Z: -0.6
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

  const centerHole = new THREE.Path();
  centerHole.absarc(0, 0, 0.58, 0, Math.PI * 2, false);
  gearShape.holes.push(centerHole);

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

  const collarMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.45, 32), darkSteelMat);
  collarMesh.rotation.x = Math.PI / 2;
  gearGroup.add(collarMesh);

  gearGroup.position.set(2.8, -1.0, -0.6);
  gearGroup.rotation.set(-0.2, 0.3, 0);
  gearGroup.scale.set(0.85, 0.85, 0.85);
  heroWorld.add(gearGroup);

  // ═══════════════════════════════════════════════════════════
  // 3. PHOTOREALISTIC VOLUMETRIC GLSL FIRE SHADER (Fuego 3D)
  // ═══════════════════════════════════════════════════════════
  const fireVertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 pos = position;
      float heightNorm = clamp((pos.y + 1.6) / 4.2, 0.0, 1.0);
      
      // Multi-frequency turbulent organic deformation
      float n1 = snoise(vec3(pos.x * 2.0, pos.y * 2.4 - uTime * 3.4, pos.z * 2.0));
      float n2 = snoise(vec3(pos.x * 4.2, pos.y * 4.8 - uTime * 5.4, pos.z * 4.2)) * 0.4;
      
      pos += normal * (n1 + n2) * (0.42 * heightNorm);
      pos.x += snoise(vec3(2.0, pos.y * 2.0 - uTime * 2.8, 0.0)) * 0.28 * heightNorm;
      pos.z += snoise(vec3(8.0, pos.y * 2.0 - uTime * 2.8, 0.0)) * 0.28 * heightNorm;

      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fireFragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      float y = clamp((vPosition.y + 1.6) / 4.2, 0.0, 1.0);
      
      float n1 = snoise(vec3(vPosition.x * 2.4, vPosition.y * 3.0 - uTime * 3.8, vPosition.z * 2.4));
      float n2 = snoise(vec3(vPosition.x * 5.0, vPosition.y * 6.5 - uTime * 7.0, vPosition.z * 5.0)) * 0.5;
      float n3 = snoise(vec3(vPosition.x * 10.0, vPosition.y * 12.0 - uTime * 10.0, vPosition.z * 10.0)) * 0.25;
      float totalNoise = (n1 + n2 + n3 + 1.0) * 0.5;

      float bottomFade = smoothstep(0.0, 0.12, y);
      float topFade = smoothstep(1.0, 0.40, y - (1.0 - totalNoise) * 0.40);
      float alpha = bottomFade * topFade;

      if (alpha < 0.02) discard;

      // Incandescent Color Temperature Spectrum
      vec3 hotWhite = vec3(1.0, 0.98, 0.94);
      vec3 goldFlame = vec3(1.0, 0.82, 0.15);
      vec3 fieryOrange = vec3(1.0, 0.42, 0.03);
      vec3 deepCrimson = vec3(0.85, 0.08, 0.01);
      vec3 smokeAsh = vec3(0.2, 0.04, 0.01);

      float heat = totalNoise * (1.18 - y * 0.60);

      vec3 col;
      if (heat > 0.70) {
        col = mix(goldFlame, hotWhite, (heat - 0.70) / 0.30);
      } else if (heat > 0.40) {
        col = mix(fieryOrange, goldFlame, (heat - 0.40) / 0.30);
      } else if (heat > 0.16) {
        col = mix(deepCrimson, fieryOrange, (heat - 0.16) / 0.24);
      } else {
        col = mix(smokeAsh, deepCrimson, heat / 0.16);
      }

      vec3 viewDir = normalize(-vPosition);
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.2);
      col += fresnel * fieryOrange * 0.9;

      gl_FragColor = vec4(col * 1.4, alpha * 0.95);
    }
  `;

  const fireUniforms = {
    uTime: { value: 0 }
  };

  const fireShaderMat = new THREE.ShaderMaterial({
    vertexShader: fireVertexShader,
    fragmentShader: fireFragmentShader,
    uniforms: fireUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });

  // ═══════════════════════════════════════════════════════════
  // CREATE MAJESTIC DEEP BACKGROUND FLAME CLUSTER (Z: -4.5)
  // ═══════════════════════════════════════════════════════════
  const flameGroup = new THREE.Group();

  function createCurvedFlameMesh(radiusBottom, radiusTop, height) {
    const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 36, 36, true);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = (pos.getY(i) + height / 2) / height; // 0 to 1
      const bulge = Math.sin(y * Math.PI) * 0.6;
      pos.setX(i, pos.getX(i) * (1.0 + bulge));
      pos.setZ(i, pos.getZ(i) * (1.0 + bulge));
    }
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, fireShaderMat);
  }

  // 1. Towering Central Flame Pillar
  const mainFlame = createCurvedFlameMesh(0.7, 0.05, 4.4);
  mainFlame.position.y = 0.4;
  flameGroup.add(mainFlame);

  // 2. Wide Left Surging Flame Wing
  const leftFlame = createCurvedFlameMesh(0.55, 0.04, 3.6);
  leftFlame.position.set(-0.85, 0.0, 0.3);
  leftFlame.rotation.z = 0.3;
  flameGroup.add(leftFlame);

  // 3. Wide Right Surging Flame Wing
  const rightFlame = createCurvedFlameMesh(0.58, 0.04, 3.8);
  rightFlame.position.set(0.9, 0.1, -0.2);
  rightFlame.rotation.z = -0.28;
  flameGroup.add(rightFlame);

  // 4. Rear Volumetric Flame Veil (Wide Background Roar)
  const rearFlame = createCurvedFlameMesh(1.1, 0.06, 5.2);
  rearFlame.position.set(0.0, 0.6, -0.5);
  flameGroup.add(rearFlame);

  // 5. Base Incandescent Glow Disc
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 128;
  glowCanvas.height = 128;
  const gCtx = glowCanvas.getContext('2d');
  const radGrad = gCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
  radGrad.addColorStop(0, 'rgba(255, 235, 160, 0.95)');
  radGrad.addColorStop(0.3, 'rgba(255, 120, 10, 0.75)');
  radGrad.addColorStop(0.7, 'rgba(255, 40, 0, 0.35)');
  radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  gCtx.fillStyle = radGrad;
  gCtx.fillRect(0, 0, 128, 128);
  const glowTex = new THREE.CanvasTexture(glowCanvas);

  const baseGlowMat = new THREE.MeshBasicMaterial({
    map: glowTex,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const baseGlowMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 4.5), baseGlowMat);
  baseGlowMesh.position.set(0, -1.6, 0);
  baseGlowMesh.rotation.x = -Math.PI / 2;
  flameGroup.add(baseGlowMesh);

  // Position Deep in Background (Z = -4.5) with Large Scale (2.4x)
  flameGroup.position.set(0.3, -0.3, -4.5);
  flameGroup.scale.set(2.3, 2.4, 2.3);
  heroWorld.add(flameGroup);

  // ═══════════════════════════════════════════════════════════
  // 4. MULTI-DEPTH SOFT GLOWING EMBERS & SPARKS (Canvas Sprites)
  // ═══════════════════════════════════════════════════════════
  const sparkCanvas = document.createElement('canvas');
  sparkCanvas.width = 64;
  sparkCanvas.height = 64;
  const sCtx = sparkCanvas.getContext('2d');
  const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  sGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  sGrad.addColorStop(0.25, 'rgba(255, 200, 50, 0.9)');
  sGrad.addColorStop(0.6, 'rgba(255, 70, 10, 0.5)');
  sGrad.addColorStop(1, 'rgba(255, 0, 0, 0)');
  sCtx.fillStyle = sGrad;
  sCtx.fillRect(0, 0, 64, 64);
  const sparkTexture = new THREE.CanvasTexture(sparkCanvas);

  const sparkCount = 110;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkVelocities = [];

  for (let i = 0; i < sparkCount; i++) {
    // Spread in full 3D depth from deep background (Z = -5.0) to foreground (Z = 1.2)
    sparkPositions[i * 3] = (Math.random() - 0.5) * 6.5;
    sparkPositions[i * 3 + 1] = -2.5 + Math.random() * 7.5;
    sparkPositions[i * 3 + 2] = -4.5 + Math.random() * 5.8;

    sparkVelocities.push({
      x: (Math.random() - 0.5) * 0.03,
      y: 0.035 + Math.random() * 0.07,
      z: (Math.random() - 0.5) * 0.03,
      swaySpeed: 2.0 + Math.random() * 3.5,
      swayDist: 0.02 + Math.random() * 0.03
    });
  }

  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
  const sparkMat = new THREE.PointsMaterial({
    size: 0.4,
    map: sparkTexture,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
  heroWorld.add(sparkPoints);

  // Ambient Starfield Particles
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 45;
  const posArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 22;
    posArray[i + 1] = (Math.random() - 0.5) * 18;
    posArray[i + 2] = (Math.random() - 0.5) * 14;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.15,
    color: 0xffb703,
    transparent: true,
    opacity: 0.45
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

    // 1. Wrench floating animation (Foreground)
    wrenchGroup.rotation.y = -0.2 + Math.sin(elapsedTime * 0.65) * 0.2 + targetX * 0.35;
    wrenchGroup.rotation.x = 0.35 + Math.cos(elapsedTime * 0.5) * 0.14 - targetY * 0.35;
    wrenchGroup.position.y = 0.2 + Math.sin(elapsedTime * 1.0) * 0.15;
    wormMesh.rotation.x = elapsedTime * 1.5;

    // 2. Gear rotation (Midground)
    gearGroup.rotation.z = elapsedTime * 0.3;
    gearGroup.rotation.y = 0.3 + Math.sin(elapsedTime * 0.55) * 0.12 + targetX * 0.25;
    gearGroup.position.y = -1.0 + Math.cos(elapsedTime * 0.85) * 0.12;

    // 3. Update Volumetric GLSL Fire Shader Uniforms (Deep Background)
    fireUniforms.uTime.value = elapsedTime;

    // Parallax depth motion for the background flame
    flameGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.12 + targetX * 0.15;
    flameGroup.rotation.z = Math.cos(elapsedTime * 1.2) * 0.04;

    // Dynamic Flame Light Intensity Flicker
    fireLight.intensity = 4.6 + Math.sin(elapsedTime * 14.0) * 0.9 + Math.cos(elapsedTime * 20.0) * 0.6;
    fireInnerLight.intensity = 3.2 + Math.cos(elapsedTime * 11.0) * 0.8;

    // 4. Rising Embers & Sparks Update
    const pos = sparkGeo.attributes.position.array;
    for (let i = 0; i < sparkCount; i++) {
      const v = sparkVelocities[i];
      pos[i * 3 + 1] += v.y;
      pos[i * 3] += Math.sin(elapsedTime * v.swaySpeed + i) * v.swayDist;
      pos[i * 3 + 2] += Math.cos(elapsedTime * v.swaySpeed + i) * v.swayDist;

      if (pos[i * 3 + 1] > 3.8) {
        pos[i * 3 + 1] = -1.3;
        pos[i * 3] = 0.2 + (Math.random() - 0.5) * 1.2;
        pos[i * 3 + 2] = 0.8 + (Math.random() - 0.5) * 1.0;
      }
    }
    sparkGeo.attributes.position.needsUpdate = true;

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

