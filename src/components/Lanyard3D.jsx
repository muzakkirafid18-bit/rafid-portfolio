import { useEffect, useRef, useState } from 'react';
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
  ctx.fillRect(0, 0, 512, 12);

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
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SMKN 1 CIBINONG', 256, 82);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('PPLG / REKAYASA PERANGKAT LUNAK', 256, 108);

  // Photo Frame with glowing ring
  const centerX = 256;
  const centerY = 265;
  const radius = 112;

  const ringGrad = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
  ringGrad.addColorStop(0, '#3b82f6');
  ringGrad.addColorStop(0.5, '#6366f1');
  ringGrad.addColorStop(1, '#a855f7');

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 6, 0, Math.PI * 2);
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
  ctx.fillStyle = 'rgba(37, 99, 235, 0.22)';
  ctx.beginPath();
  ctx.roundRect(116, 405, 280, 40, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.55)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#93c5fd';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('BACKEND DEVELOPER', 256, 431);

  // Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 34px "Space Grotesk", sans-serif';
  ctx.fillText('Rafid Muzakki', 256, 492);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '600 22px "Space Grotesk", sans-serif';
  ctx.fillText('Putra Andryan', 256, 524);

  // Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(48, 558);
  ctx.lineTo(464, 558);
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
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.35)';
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

  // Accent bar
  const topGrad = ctx.createLinearGradient(0, 0, 512, 0);
  topGrad.addColorStop(0, '#a855f7');
  topGrad.addColorStop(1, '#2563eb');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, 512, 12);

  // Lanyard slot
  ctx.fillStyle = '#04050e';
  ctx.beginPath();
  ctx.roundRect(216, 26, 80, 18, 9);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#3b82f6';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText('>_ RAFID.DEV', 256, 160);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px "Space Grotesk", sans-serif';
  ctx.fillText('PORTFOLIO', 256, 235);

  ctx.fillStyle = '#a5b4fc';
  ctx.font = 'italic 20px "Inter", sans-serif';
  ctx.fillText('"Clean Code, Solid Backend"', 256, 290);

  // Center badge
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

  ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
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
  ctx.fillRect(0, 0, 512, 10);
  ctx.fillRect(0, 118, 512, 10);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 28px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RAFID MUZAKKI  •  BACKEND DEV', 256, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(3, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function Lanyard3D() {
  const mountRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 8.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x93c5fd, 1.8);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 1.2);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    // Pivot Group at top anchor
    const anchorY = 3.6;
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Build Card Mesh
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

    const cardGeo = new THREE.BoxGeometry(2.15, 3.1, 0.06);
    const cardMesh = new THREE.Mesh(cardGeo, [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]);
    cardGroup.add(cardMesh);

    // Metal Clasp / Clip
    const clipGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.45, 16);
    const clipMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.2 });
    const clipMesh = new THREE.Mesh(clipGeo, clipMat);
    clipMesh.rotation.z = Math.PI / 2;
    clipMesh.position.set(0, 1.62, 0);
    cardGroup.add(clipMesh);

    const hookGeo = new THREE.TorusGeometry(0.14, 0.035, 12, 24);
    const hookMesh = new THREE.Mesh(hookGeo, clipMat);
    hookMesh.position.set(0, 1.76, 0);
    cardGroup.add(hookMesh);

    // Load real formal photo onto card front texture
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/rafid-foto.jpg';
    img.onload = () => {
      frontMat.map = createCardFrontTexture(img);
      frontMat.needsUpdate = true;
    };

    // Lanyard Strap Mesh (dynamically updated curve)
    const strapMat = new THREE.MeshStandardMaterial({
      map: createStrapTexture(),
      roughness: 0.65,
      metalness: 0.1,
    });
    let strapMesh = null;

    const updateStrap = (endPos) => {
      if (strapMesh) {
        scene.remove(strapMesh);
        strapMesh.geometry.dispose();
      }
      const p0 = new THREE.Vector3(-0.18, anchorY, -0.1);
      const p1 = new THREE.Vector3(endPos.x * 0.45, (anchorY + endPos.y) * 0.52, endPos.z * 0.4);
      const p2 = new THREE.Vector3(endPos.x, endPos.y, endPos.z);

      const curve = new THREE.CatmullRomCurve3([p0, p1, p2]);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.085, 8, false);
      strapMesh = new THREE.Mesh(tubeGeo, strapMat);
      scene.add(strapMesh);
    };

    // Spring Physics State
    const restPos = new THREE.Vector3(0, -0.25, 0);
    const pos = restPos.clone();
    const vel = new THREE.Vector3(0, 0, 0);
    const targetPos = restPos.clone();
    let dragging = false;
    let pointerStart = { x: 0, y: 0 };
    let rotY = 0;
    let rotYVel = 0;

    const onPointerDown = (e) => {
      dragging = true;
      setIsDragging(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      pointerStart = { x: clientX, y: clientY };
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = (clientX - pointerStart.x) * 0.012;
      const dy = -(clientY - pointerStart.y) * 0.012;
      targetPos.x = THREE.MathUtils.clamp(dx, -2.0, 2.0);
      targetPos.y = THREE.MathUtils.clamp(restPos.y + dy, -1.6, 1.3);
      rotYVel = dx * 0.15;
    };

    const onPointerUp = () => {
      if (dragging) {
        dragging = false;
        setIsDragging(false);
        targetPos.copy(restPos);
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Gentle idle sway when not dragging
      const swayX = dragging ? 0 : Math.sin(t * 1.1) * 0.14;
      const swayY = dragging ? 0 : Math.cos(t * 0.85) * 0.06;

      // Spring force toward targetPos
      const stiffness = dragging ? 0.22 : 0.065;
      const damping = dragging ? 0.72 : 0.88;

      const fx = (targetPos.x + swayX - pos.x) * stiffness;
      const fy = (targetPos.y + swayY - pos.y) * stiffness;

      vel.x = (vel.x + fx) * damping;
      vel.y = (vel.y + fy) * damping;
      pos.x += vel.x;
      pos.y += vel.y;

      cardGroup.position.copy(pos);

      // Realistic tilt from velocity + gentle Y-axis idle rotation
      cardGroup.rotation.z = THREE.MathUtils.clamp(-pos.x * 0.18 - vel.x * 0.35, -0.5, 0.5);
      cardGroup.rotation.x = THREE.MathUtils.clamp(vel.y * 0.35, -0.35, 0.35);

      if (dragging) {
        rotY += rotYVel;
      } else {
        rotY = THREE.MathUtils.lerp(rotY, Math.sin(t * 0.7) * 0.22, 0.05);
      }
      cardGroup.rotation.y = rotY;

      // Hook world position for strap end
      const hookLocal = new THREE.Vector3(0, 1.82, 0);
      hookLocal.applyEuler(cardGroup.rotation);
      hookLocal.add(cardGroup.position);
      updateStrap(hookLocal);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (strapMesh) strapMesh.geometry.dispose();
      cardGeo.dispose();
      renderer.dispose();
      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[430px] sm:h-[500px] flex flex-col items-center justify-center select-none">
      {/* Subtle Blue-Purple Backlight behind 3D card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-600/20 blur-[90px] pointer-events-none"></div>

      <div
        ref={mountRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        title="Tarik & geser kartu ID 3D!"
      />

      <p className="text-[11px] font-mono text-slate-400/80 -mt-4 pointer-events-none">
        ✦ Drag & tarik kartu ID 3D untuk berinteraksi
      </p>
    </div>
  );
}
