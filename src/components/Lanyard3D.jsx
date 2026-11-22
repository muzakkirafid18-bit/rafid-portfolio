import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createCardFrontTexture(photoImg) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 740;
  const ctx = canvas.getContext('2d');

  // Deep cosmic card background
  const bgGrad = ctx.createLinearGradient(0, 0, 512, 740);
  bgGrad.addColorStop(0, '#0b1128');
  bgGrad.addColorStop(0.5, '#070a1c');
  bgGrad.addColorStop(1, '#0d1533');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 740);

  // Subtle grid lines
  ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 740);
    ctx.stroke();
  }
  for (let y = 0; y < 740; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Top glow accent bar
  const topGrad = ctx.createLinearGradient(0, 0, 512, 0);
  topGrad.addColorStop(0, '#2563eb');
  topGrad.addColorStop(0.5, '#6366f1');
  topGrad.addColorStop(1, '#a855f7');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, 512, 14);

  // Lanyard slot cutout
  ctx.fillStyle = '#04050e';
  ctx.beginPath();
  ctx.roundRect(216, 26, 80, 18, 9);
  ctx.fill();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // School & Major Header
  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 21px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SMKN 1 CIBINONG', 256, 82);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('PPLG / REKAYASA PERANGKAT LUNAK', 256, 108);

  // Photo Frame with glowing ring
  const centerX = 256;
  const centerY = 265;
  const radius = 114;

  const ringGrad = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
  ringGrad.addColorStop(0, '#3b82f6');
  ringGrad.addColorStop(0.5, '#6366f1');
  ringGrad.addColorStop(1, '#a855f7');

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 7, 0, Math.PI * 2);
  ctx.fillStyle = ringGrad;
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (photoImg) {
    const scale = Math.max((radius * 2) / photoImg.width, (radius * 2) / photoImg.height);
    const drawW = photoImg.width * scale;
    const drawH = photoImg.height * scale;
    ctx.drawImage(photoImg, centerX - drawW / 2, centerY - drawH / 2 + 12, drawW, drawH);
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
  }
  ctx.restore();

  // Role Pill
  ctx.fillStyle = 'rgba(37, 99, 235, 0.25)';
  ctx.beginPath();
  ctx.roundRect(112, 404, 288, 42, 21);
  ctx.fill();
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.65)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#93c5fd';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('BACKEND DEVELOPER', 256, 431);

  // Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 38px "Space Grotesk", sans-serif';
  ctx.fillText('Rafid Muzakki', 256, 495);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '600 22px "Space Grotesk", sans-serif';
  ctx.fillText('Putra Andryan', 256, 528);

  // Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(48, 560);
  ctx.lineTo(464, 560);
  ctx.stroke();

  // Stack footer
  ctx.fillStyle = '#818cf8';
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillText('PHP • LARAVEL • MYSQL • POSTGRES', 256, 594);

  // Barcode / ID footer
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.beginPath();
  ctx.roundRect(48, 624, 416, 76, 14);
  ctx.fill();

  ctx.fillStyle = '#64748b';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('ID: RAFID-DEV-2026', 68, 656);
  ctx.fillText('LOC: CIBINONG, ID', 68, 680);

  // Mini barcode bars
  ctx.fillStyle = '#94a3b8';
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 4, 6, 2, 4];
  let bx = 320;
  bars.forEach((w, idx) => {
    if (idx % 2 === 0) {
      ctx.fillRect(bx, 642, w, 40);
    }
    bx += w + 3;
  });

  // Outer border
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 508, 736);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createCardBackTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 740;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 512, 740);
  bgGrad.addColorStop(0, '#070a1c');
  bgGrad.addColorStop(1, '#0e1330');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 740);

  const topGrad = ctx.createLinearGradient(0, 0, 512, 0);
  topGrad.addColorStop(0, '#a855f7');
  topGrad.addColorStop(1, '#2563eb');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, 512, 14);

  ctx.fillStyle = '#04050e';
  ctx.beginPath();
  ctx.roundRect(216, 26, 80, 18, 9);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  ctx.fillText('Rafid Muzakki', 256, 155);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Space Grotesk", sans-serif';
  ctx.fillText('PORTFOLIO', 256, 230);

  ctx.fillStyle = '#a5b4fc';
  ctx.font = 'italic 20px "Inter", sans-serif';
  ctx.fillText('"Clean Code, Solid Backend"', 256, 285);

  ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(86, 355, 340, 180, 20);
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillText('• RESTful API Design', 256, 405);
  ctx.fillText('• Relational DB (54+ Tables)', 256, 442);
  ctx.fillText('• Laravel & PHP Native', 256, 479);
  ctx.fillText('• Neo One Industry Validated', 256, 516);

  ctx.fillStyle = '#60a5fa';
  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.fillText('rafid-dev-portfolio.vercel.app', 256, 650);

  ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 508, 736);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createStrapTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 128);

  ctx.fillStyle = '#2563eb';
  ctx.fillRect(0, 0, 512, 12);
  ctx.fillRect(0, 116, 512, 12);

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 34px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RAFID MUZAKKI  •  RAFID MUZAKKI', 256, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(3, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function Lanyard3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const getSize = () => ({
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || 680,
    });

    let { width, height } = getSize();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 10.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x93c5fd, 1.9);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 1.3);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    // Card Group (Bigger size: 2.55 x 3.65)
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const sideMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.6 });
    const frontMat = new THREE.MeshStandardMaterial({
      map: createCardFrontTexture(null),
      roughness: 0.25,
      metalness: 0.15,
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: createCardBackTexture(),
      roughness: 0.25,
      metalness: 0.15,
    });

    const cardGeo = new THREE.BoxGeometry(2.55, 3.65, 0.07);
    const cardMesh = new THREE.Mesh(cardGeo, [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]);
    cardMesh.position.set(0, -1.9, 0);
    cardGroup.add(cardMesh);

    // Generous invisible hitbox so grabbing never misses or drops while swinging
    const hitGeo = new THREE.BoxGeometry(3.1, 4.2, 0.6);
    const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.position.set(0, -1.9, 0);
    cardGroup.add(hitMesh);

    const clipGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.5, 16);
    const clipMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.2 });
    const clipMesh = new THREE.Mesh(clipGeo, clipMat);
    clipMesh.rotation.z = Math.PI / 2;
    clipMesh.position.set(0, -0.04, 0);
    cardGroup.add(clipMesh);

    const hookGeo = new THREE.TorusGeometry(0.14, 0.036, 12, 24);
    const hookMesh = new THREE.Mesh(hookGeo, clipMat);
    hookMesh.position.set(0, 0.11, 0);
    cardGroup.add(hookMesh);

    // Load formal photo
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/rafid-foto.jpg';
    img.onload = () => {
      frontMat.map = createCardFrontTexture(img);
      frontMat.needsUpdate = true;
    };

    // Anchor on the right column on desktop, centered lower on mobile
    const computeAnchor = (w, h) => {
      const isDesktop = w >= 1024;
      const aspect = w / h;
      if (isDesktop) {
        return new THREE.Vector3(Math.min(aspect * 1.45, 2.55), 3.7, 0);
      }
      return new THREE.Vector3(0, 1.35, 0);
    };

    let anchorPos = computeAnchor(width, height);
    const numNodes = 8;
    const segLength = 0.34;
    const nodes = Array.from({ length: numNodes }, (_, i) => {
      const p = new THREE.Vector3(anchorPos.x, anchorPos.y - i * segLength, 0);
      return { pos: p.clone(), oldPos: p.clone() };
    });

    const strapMat = new THREE.MeshStandardMaterial({
      map: createStrapTexture(),
      roughness: 0.65,
      metalness: 0.1,
    });
    let strapMesh = null;

    const updateStrapMesh = () => {
      if (strapMesh) {
        scene.remove(strapMesh);
        strapMesh.geometry.dispose();
      }
      const points = nodes.map((n) => n.pos.clone());
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 28, 0.11, 8, false);
      strapMesh = new THREE.Mesh(tubeGeo, strapMat);
      scene.add(strapMesh);
    };

    // Raycasting on window so clicks pass through when NOT on the card,
    // and when grabbing the card you can pull it anywhere across the entire Hero!
    const raycaster = new THREE.Raycaster();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();
    const dragOffset = new THREE.Vector3();
    const pointerNDC = new THREE.Vector2();

    let dragging = false;
    let dragTarget = new THREE.Vector3();
    let prevPointerX = 0;
    let rotY = 0;
    let rotYVel = 0;

    const updatePointerNDC = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (e) => {
      // Ignore clicks on actual interactive buttons/links/inputs
      if (e.target && e.target.closest && e.target.closest('a, button, input, textarea, select')) {
        return;
      }

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      updatePointerNDC(clientX, clientY);

      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObject(cardGroup, true);

      if (hits.length > 0) {
        e.preventDefault();
        dragging = true;
        prevPointerX = clientX;
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        if (raycaster.ray.intersectPlane(dragPlane, intersectPoint)) {
          const endNode = nodes[numNodes - 1].pos;
          dragOffset.copy(endNode).sub(intersectPoint);
          dragTarget.copy(endNode);
        }
      }
    };

    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      updatePointerNDC(clientX, clientY);
      raycaster.setFromCamera(pointerNDC, camera);

      if (!dragging) {
        const hits = raycaster.intersectObject(cardGroup, true);
        document.body.style.cursor = hits.length > 0 ? 'grab' : '';
        return;
      }

      if (raycaster.ray.intersectPlane(dragPlane, intersectPoint)) {
        dragTarget.copy(intersectPoint).add(dragOffset);
      }

      const dx = clientX - prevPointerX;
      rotYVel = THREE.MathUtils.clamp(dx * 0.014, -0.32, 0.32);
      prevPointerX = clientX;
    };

    const onPointerUp = () => {
      if (dragging) {
        dragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: false });
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('blur', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const size = getSize();
      width = size.width;
      height = size.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      anchorPos = computeAnchor(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Physics + Render Loop
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      const gravity = -0.015;
      const damping = 0.965;

      for (let i = 1; i < numNodes; i++) {
        const n = nodes[i];
        const vx = (n.pos.x - n.oldPos.x) * damping;
        const vy = (n.pos.y - n.oldPos.y) * damping;
        const vz = (n.pos.z - n.oldPos.z) * damping;

        n.oldPos.copy(n.pos);
        n.pos.x += vx;
        n.pos.y += vy + gravity;
        n.pos.z += vz;

        if (!dragging && i === numNodes - 1) {
          n.pos.x += Math.sin(t * 1.4) * 0.0025;
        }
      }

      nodes[0].pos.copy(anchorPos);
      if (dragging) {
        nodes[numNodes - 1].pos.lerp(dragTarget, 0.72);
      }

      const maxStretchRatio = dragging ? 2.4 : 1.0;
      for (let iter = 0; iter < 8; iter++) {
        nodes[0].pos.copy(anchorPos);
        if (dragging) {
          nodes[numNodes - 1].pos.copy(dragTarget);
        }

        for (let i = 0; i < numNodes - 1; i++) {
          const a = nodes[i].pos;
          const b = nodes[i + 1].pos;
          const delta = new THREE.Vector3().subVectors(b, a);
          const dist = delta.length() || 0.0001;
          const targetLen = segLength * maxStretchRatio;
          if (dist > segLength || !dragging) {
            const diff = (dist - (dragging ? Math.min(dist, targetLen) : segLength)) / dist;
            if (i === 0) {
              b.sub(delta.multiplyScalar(diff));
            } else if (dragging && i + 1 === numNodes - 1) {
              a.add(delta.multiplyScalar(diff));
            } else {
              const half = delta.multiplyScalar(diff * 0.5);
              a.add(half);
              b.sub(half);
            }
          }
        }
      }

      const claspPos = nodes[numNodes - 1].pos;
      const prevNodePos = nodes[numNodes - 2].pos;
      cardGroup.position.copy(claspPos);

      const ropeDir = new THREE.Vector3().subVectors(claspPos, prevNodePos);
      const tiltZ = Math.atan2(ropeDir.x, -ropeDir.y);
      cardGroup.rotation.z = THREE.MathUtils.lerp(
        cardGroup.rotation.z,
        THREE.MathUtils.clamp(tiltZ, -0.9, 0.9),
        0.35
      );
      cardGroup.rotation.x = THREE.MathUtils.lerp(
        cardGroup.rotation.x,
        THREE.MathUtils.clamp(ropeDir.z * 0.6, -0.45, 0.45),
        0.25
      );

      if (dragging) {
        rotY += rotYVel;
        rotYVel *= 0.9;
      } else {
        rotY += rotYVel;
        rotYVel *= 0.94;
        rotY = THREE.MathUtils.lerp(rotY, Math.sin(t * 0.75) * 0.22, 0.03);
      }
      cardGroup.rotation.y = rotY;

      updateStrapMesh();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('blur', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (strapMesh) strapMesh.geometry.dispose();
      cardGeo.dispose();
      hitGeo.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-10 pointer-events-none select-none overflow-visible"
    />
  );
}
