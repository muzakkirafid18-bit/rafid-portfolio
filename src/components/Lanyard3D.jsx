import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createCardFrontTexture(photoImg) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 740;
  const ctx = canvas.getContext('2d');

  // Sleek dark matte card background (alfari.my.id style)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 740);
  bgGrad.addColorStop(0, '#11131d');
  bgGrad.addColorStop(0.55, '#090a10');
  bgGrad.addColorStop(1, '#0d101b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 740);

  // Subtle corner glow
  const radGlow = ctx.createRadialGradient(256, 180, 20, 256, 180, 320);
  radGlow.addColorStop(0, 'rgba(37, 99, 235, 0.14)');
  radGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radGlow;
  ctx.fillRect(0, 0, 512, 740);

  // Lanyard slot cutout
  ctx.fillStyle = '#030408';
  ctx.beginPath();
  ctx.roundRect(210, 26, 92, 18, 9);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Top Role Tag
  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BACKEND DEVELOPER', 256, 86);

  // School & Major
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 20px "Space Grotesk", sans-serif';
  ctx.fillText('SMKN 1 CIBINONG', 256, 118);

  ctx.fillStyle = '#64748b';
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillText('PPLG / REKAYASA PERANGKAT LUNAK', 256, 142);

  // Rounded-Rectangle Portrait Frame (like alfari.my.id ID card)
  const frameX = 116;
  const frameY = 172;
  const frameW = 280;
  const frameH = 310;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(frameX, frameY, frameW, frameH, 22);
  ctx.closePath();
  ctx.clip();

  if (photoImg) {
    const scale = Math.max(frameW / photoImg.width, frameH / photoImg.height);
    const drawW = photoImg.width * scale;
    const drawH = photoImg.height * scale;
    ctx.drawImage(photoImg, 256 - drawW / 2, frameY + (frameH - drawH) / 2 + 12, drawW, drawH);
  } else {
    ctx.fillStyle = '#161b2e';
    ctx.fillRect(frameX, frameY, frameW, frameH);
  }
  ctx.restore();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(frameX, frameY, frameW, frameH, 22);
  ctx.stroke();

  // Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 34px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Rafid Muzakki', 256, 536);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 18px "Inter", sans-serif';
  ctx.fillText('Putra Andryan', 256, 566);

  // Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(54, 598);
  ctx.lineTo(458, 598);
  ctx.stroke();

  // Bottom Portfolio Tag + Motto
  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('PORTFOLIO', 56, 636);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 14px "Inter", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText("Don't repeat yourself", 456, 636);

  // Bottom minimal bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.beginPath();
  ctx.roundRect(54, 658, 404, 46, 12);
  ctx.fill();

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PHP  •  LARAVEL  •  MYSQL  •  POSTGRES', 256, 686);

  // Crisp Card Outer Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 3;
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

  const bgGrad = ctx.createLinearGradient(0, 0, 0, 740);
  bgGrad.addColorStop(0, '#090a10');
  bgGrad.addColorStop(1, '#11131d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 740);

  ctx.fillStyle = '#030408';
  ctx.beginPath();
  ctx.roundRect(210, 26, 92, 18, 9);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 24px "Space Grotesk", sans-serif';
  ctx.fillText('Rafid Muzakki', 256, 170);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px "Space Grotesk", sans-serif';
  ctx.fillText('PORTFOLIO', 256, 235);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 20px "Inter", sans-serif';
  ctx.fillText("Don't repeat yourself", 256, 285);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 508, 736);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createFlatStrapTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Sleek dark lanyard fabric
  ctx.fillStyle = '#0b0e17';
  ctx.fillRect(0, 0, 256, 1024);

  // Subtle edge stitching
  ctx.fillStyle = 'rgba(59, 130, 246, 0.55)';
  ctx.fillRect(10, 0, 4, 1024);
  ctx.fillRect(242, 0, 4, 1024);

  // Repeating vertical "Rafid Muzakki" text along the flat strap
  ctx.save();
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 34px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let y = 140; y < 1024; y += 340) {
    ctx.save();
    ctx.translate(128, y);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Rafid Muzakki', 0, 0);
    ctx.restore();
  }
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1.5);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Build a clean flat ribbon geometry along a 3D curve (looks like a real flat cloth lanyard!)
function buildRibbonGeometry(points, halfWidth = 0.19) {
  const curve = new THREE.CatmullRomCurve3(points);
  const segments = 28;
  const sampled = curve.getPoints(segments);

  const positions = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= segments; i++) {
    const p = sampled[i];
    const tangent =
      i < segments
        ? new THREE.Vector3().subVectors(sampled[i + 1], p).normalize()
        : new THREE.Vector3().subVectors(p, sampled[i - 1]).normalize();

    // Perpendicular vector in XY plane so ribbon always faces camera cleanly
    const side = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize().multiplyScalar(halfWidth);

    const left = new THREE.Vector3().subVectors(p, side);
    const right = new THREE.Vector3().addVectors(p, side);

    positions.push(left.x, left.y, left.z, right.x, right.y, right.z);

    const v = i / segments;
    uvs.push(0, v, 1, v);

    if (i < segments) {
      const base = i * 2;
      indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x93c5fd, 1.7);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 1.0);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    // Card Group
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const sideMat = new THREE.MeshStandardMaterial({ color: 0x161925, roughness: 0.4, metalness: 0.5 });
    const frontMat = new THREE.MeshStandardMaterial({
      map: createCardFrontTexture(null),
      roughness: 0.28,
      metalness: 0.12,
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: createCardBackTexture(),
      roughness: 0.28,
      metalness: 0.12,
    });

    const cardGeo = new THREE.BoxGeometry(2.55, 3.65, 0.06);
    const cardMesh = new THREE.Mesh(cardGeo, [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]);
    cardMesh.position.set(0, -1.9, 0);
    cardGroup.add(cardMesh);

    const hitGeo = new THREE.BoxGeometry(3.1, 4.2, 0.6);
    const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.position.set(0, -1.9, 0);
    cardGroup.add(hitMesh);

    // Metallic flat lanyard clasp
    const clipMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.88, roughness: 0.22 });
    const claspBoxGeo = new THREE.BoxGeometry(0.42, 0.18, 0.1);
    const claspMesh = new THREE.Mesh(claspBoxGeo, clipMat);
    claspMesh.position.set(0, -0.02, 0);
    cardGroup.add(claspMesh);

    const hookGeo = new THREE.TorusGeometry(0.11, 0.03, 12, 24);
    const hookMesh = new THREE.Mesh(hookGeo, clipMat);
    hookMesh.position.set(0, 0.12, 0);
    cardGroup.add(hookMesh);

    // Load formal photo
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/rafid-foto.jpg';
    img.onload = () => {
      frontMat.map = createCardFrontTexture(img);
      frontMat.needsUpdate = true;
    };

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
      map: createFlatStrapTexture(),
      roughness: 0.72,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    let strapMesh = null;

    const updateStrapMesh = () => {
      if (strapMesh) {
        scene.remove(strapMesh);
        strapMesh.geometry.dispose();
      }
      const points = nodes.map((n) => n.pos.clone());
      const ribbonGeo = buildRibbonGeometry(points, 0.19);
      strapMesh = new THREE.Mesh(ribbonGeo, strapMat);
      scene.add(strapMesh);
    };

    const raycaster = new THREE.Raycaster();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();
    const dragOffset = new THREE.Vector3();
    const pointerNDC = new THREE.Vector2();

    let dragging = false;
    let dragTarget = new THREE.Vector3();

    const updatePointerNDC = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (e) => {
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
        THREE.MathUtils.clamp(ropeDir.z * 0.4, -0.25, 0.25),
        0.25
      );
      cardGroup.rotation.y = THREE.MathUtils.lerp(
        cardGroup.rotation.y,
        dragging ? 0 : Math.sin(t * 0.75) * 0.08,
        0.12
      );

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
      claspBoxGeo.dispose();
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
