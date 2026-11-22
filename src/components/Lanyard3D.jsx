import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Flood-fill from outer borders ONLY to remove the red studio backdrop cleanly
// without EVER touching a single pixel of face, lips, or skin!
function extractSuitCutout(photoImg) {
  const off = document.createElement('canvas');
  off.width = photoImg.width;
  off.height = photoImg.height;
  const octx = off.getContext('2d');
  octx.drawImage(photoImg, 0, 0);

  const w = off.width;
  const h = off.height;
  const imgData = octx.getImageData(0, 0, w, h);
  const data = imgData.data;

  const isBackdropRed = (idx) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r > 120 && r - Math.max(g, b) > 75 && g < 85 && b < 85;
  };

  const visited = new Uint8Array(w * h);
  const queue = [];

  // Seed flood-fill from top, left, and right edges only
  for (let x = 0; x < w; x++) {
    const topPos = x;
    if (isBackdropRed(topPos * 4)) {
      visited[topPos] = 1;
      queue.push(topPos);
    }
  }
  for (let y = 0; y < h; y++) {
    const leftPos = y * w;
    if (!visited[leftPos] && isBackdropRed(leftPos * 4)) {
      visited[leftPos] = 1;
      queue.push(leftPos);
    }
    const rightPos = y * w + (w - 1);
    if (!visited[rightPos] && isBackdropRed(rightPos * 4)) {
      visited[rightPos] = 1;
      queue.push(rightPos);
    }
  }

  let head = 0;
  while (head < queue.length) {
    const pos = queue[head++];
    data[pos * 4 + 3] = 0; // Make exterior red backdrop transparent

    const x = pos % w;
    const y = (pos - x) / w;

    const neighbors = [
      x > 0 ? pos - 1 : -1,
      x < w - 1 ? pos + 1 : -1,
      y > 0 ? pos - w : -1,
      y < h - 1 ? pos + w : -1,
    ];

    for (let i = 0; i < 4; i++) {
      const n = neighbors[i];
      if (n >= 0 && !visited[n] && isBackdropRed(n * 4)) {
        visited[n] = 1;
        queue.push(n);
      }
    }
  }

  // Soft 1px fringe cleanup ONLY on pixels immediately touching removed backdrop
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const pos = y * w + x;
      if (!visited[pos]) {
        if (visited[pos - 1] || visited[pos + 1] || visited[pos - w] || visited[pos + w]) {
          const idx = pos * 4;
          if (data[idx] > 110 && data[idx] - Math.max(data[idx + 1], data[idx + 2]) > 45) {
            data[idx + 3] = 90;
          }
        }
      }
    }
  }

  octx.putImageData(imgData, 0, 0);
  return off;
}

function createCardFrontTexture(photoImg) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');

  // 1. Black Rounded Outer Bezel
  ctx.fillStyle = '#090b10';
  ctx.fillRect(0, 0, 512, 760);

  // Inner Card Clip (rounded corners)
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(14, 14, 484, 732, 24);
  ctx.closePath();
  ctx.clip();

  // 2. Warm Cream / Off-White Base (#ebe4d5)
  ctx.fillStyle = '#ebe4d5';
  ctx.fillRect(14, 14, 484, 732);

  // Graph-Paper / Blueprint Grid Pattern
  ctx.strokeStyle = 'rgba(12, 22, 43, 0.1)';
  ctx.lineWidth = 1;
  for (let x = 14; x <= 498; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 14);
    ctx.lineTo(x, 746);
    ctx.stroke();
  }
  for (let y = 14; y <= 746; y += 24) {
    ctx.beginPath();
    ctx.moveTo(14, y);
    ctx.lineTo(498, y);
    ctx.stroke();
  }

  // Top lanyard slot cutout
  ctx.fillStyle = '#090b10';
  ctx.beginPath();
  ctx.roundRect(216, 22, 80, 16, 8);
  ctx.fill();

  // 3. Header Row: Left "JUNIOR" Dark Navy Badge + Right School Emblem & Name
  ctx.fillStyle = '#0c162b';
  ctx.fillRect(36, 54, 118, 34);
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 20px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JUNIOR', 95, 72);

  // Thin horizontal connector line + square dot right of JUNIOR badge
  ctx.strokeStyle = '#0c162b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(162, 71);
  ctx.lineTo(290, 71);
  ctx.stroke();
  ctx.fillStyle = '#0c162b';
  ctx.fillRect(288, 67, 8, 8);

  // Right School Shield Emblem (yellow-blue-white)
  ctx.save();
  ctx.translate(332, 71);
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(15, -13);
  ctx.lineTo(13, 6);
  ctx.lineTo(0, 18);
  ctx.lineTo(-13, 6);
  ctx.lineTo(-15, -13);
  ctx.closePath();
  ctx.fillStyle = '#2563eb';
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#facc15';
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px "Space Grotesk", sans-serif';
  ctx.fillText('1', 0, 1);
  ctx.restore();

  // School 3-line text
  ctx.fillStyle = '#0c162b';
  ctx.textAlign = 'left';
  ctx.font = 'bold 14px "Space Grotesk", sans-serif';
  ctx.fillText('SMKN 1', 356, 59);
  ctx.fillText('CIBINONG', 356, 74);
  ctx.fillText('BOGOR', 356, 89);

  // 4. Giant Bold Display Text "DEVELOPER" across full card width
  ctx.fillStyle = '#0c162b';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.font = '800 80px "Space Grotesk", sans-serif';
  ctx.save();
  ctx.translate(256, 178);
  ctx.scale(0.95, 1.18);
  ctx.fillText('DEVELOPER', 0, 0);
  ctx.restore();

  // 5. Middle-Left Ocean Wave Texture Box behind portrait
  ctx.save();
  ctx.beginPath();
  ctx.rect(36, 224, 290, 320);
  ctx.clip();

  const oceanGrad = ctx.createLinearGradient(36, 224, 326, 544);
  oceanGrad.addColorStop(0, '#0f2947');
  oceanGrad.addColorStop(0.5, '#1d446b');
  oceanGrad.addColorStop(1, '#0b1e36');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(36, 224, 290, 320);

  // Stylized sea foam / wave lines
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.22)';
  ctx.lineWidth = 3;
  for (let w = 0; w < 14; w++) {
    const wy = 240 + w * 22;
    ctx.beginPath();
    ctx.moveTo(20, wy);
    ctx.bezierCurveTo(100, wy - 14, 210, wy + 18, 340, wy - 8);
    ctx.stroke();
  }
  ctx.restore();

  // Thin dark wireframe border around center frame
  ctx.strokeStyle = 'rgba(12, 22, 43, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(36, 206, 440, 360);

  // 6. Right Vertical Rotated Major Text ("PPLG / RPL" / "REKAYASA PERANGKAT LUNAK")
  ctx.save();
  ctx.translate(454, 385);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#0c162b';
  ctx.font = '800 32px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PPLG • BACKEND', 0, 0);
  ctx.restore();

  // 7. Bottom Diagonal Dark Navy Block (#0b1528)
  ctx.fillStyle = '#0b1528';
  ctx.beginPath();
  ctx.moveTo(14, 588);
  ctx.lineTo(498, 536);
  ctx.lineTo(498, 746);
  ctx.lineTo(14, 746);
  ctx.closePath();
  ctx.fill();

  // 8. Cutout Portrait of Rafid (Overlapping "DEVELOPER" & ocean box!)
  if (photoImg) {
    const cutout = extractSuitCutout(photoImg);
    const drawW = 340;
    const drawH = (cutout.height / cutout.width) * drawW;
    ctx.drawImage(cutout, 240 - drawW / 2, 146, drawW, drawH);
  }

  // 9. Tilted Cream Name Sticker across Lower Torso
  ctx.save();
  ctx.translate(236, 542);
  ctx.rotate(-0.11);
  ctx.fillStyle = '#f3eee2';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 10;
  ctx.fillRect(-176, -23, 352, 46);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#0c162b';
  ctx.font = '800 19px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RAFID MUZAKKI PUTRA ANDRYAN', 0, 1);
  ctx.restore();

  // 10. Footer Texts inside Dark Navy Block
  ctx.fillStyle = '#f3eee2';
  ctx.font = '800 32px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('PORTFOLIO', 42, 704);

  // Subtle wireframe ellipse in bottom-right
  ctx.strokeStyle = 'rgba(243, 238, 226, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(315, 672, 26, 12, -0.35, 0, Math.PI * 2);
  ctx.stroke();

  // Italic motto "Don't repeat / yourself"
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'italic 600 18px "Inter", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText("Don't repeat", 464, 674);
  ctx.fillText('yourself', 464, 698);

  // 11. Metallic Chrome Decorative Rings at Bottom-Left & Bottom-Right Corners
  const drawChromeRing = (cx, cy, r) => {
    const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    grad.addColorStop(0, '#f8fafc');
    grad.addColorStop(0.5, '#64748b');
    grad.addColorStop(1, '#e2e8f0');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  };
  drawChromeRing(22, 650, 34);
  drawChromeRing(492, 578, 32);

  ctx.restore(); // end inner rounded clip

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createCardBackTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#090b10';
  ctx.fillRect(0, 0, 512, 760);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(14, 14, 484, 732, 24);
  ctx.closePath();
  ctx.clip();

  ctx.fillStyle = '#0b1528';
  ctx.fillRect(14, 14, 484, 732);

  ctx.fillStyle = '#090b10';
  ctx.beginPath();
  ctx.roundRect(216, 22, 80, 16, 8);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ebe4d5';
  ctx.font = '800 44px "Space Grotesk", sans-serif';
  ctx.fillText('PORTFOLIO', 256, 330);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 22px "Inter", sans-serif';
  ctx.fillText("Don't repeat yourself", 256, 380);

  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillText('RAFID MUZAKKI', 256, 450);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Matte black flat strap with repeating "(R) Rafid Muzakki" pattern (persis Alfari!)
function createFlatStrapTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Matte black fabric
  ctx.fillStyle = '#0d0e13';
  ctx.fillRect(0, 0, 256, 1024);

  // Subtle fabric weave borders
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(6, 0, 2, 1024);
  ctx.fillRect(248, 0, 2, 1024);

  for (let y = 170; y < 1024; y += 340) {
    ctx.save();
    ctx.translate(128, y);
    ctx.rotate(Math.PI / 2);

    // White circle icon with geometric 'R'
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-112, 0, 22, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 24px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('R', -112, 1);

    // Crisp white sans-serif "Rafid Muzakki"
    ctx.font = '700 32px "Space Grotesk", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Rafid Muzakki', -76, 1);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1.5);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function buildRibbonGeometry(points, halfWidth = 0.21) {
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

    // Balanced Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 0.6);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    // Card Group
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const sideMat = new THREE.MeshStandardMaterial({ color: 0x090b10, roughness: 0.4, metalness: 0.4 });
    const frontMat = new THREE.MeshStandardMaterial({
      map: createCardFrontTexture(null),
      roughness: 0.35,
      metalness: 0.08,
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: createCardBackTexture(),
      roughness: 0.35,
      metalness: 0.08,
    });

    const cardGeo = new THREE.BoxGeometry(2.55, 3.72, 0.06);
    const cardMesh = new THREE.Mesh(cardGeo, [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]);
    cardMesh.position.set(0, -1.94, 0);
    cardGroup.add(cardMesh);

    const hitGeo = new THREE.BoxGeometry(3.1, 4.25, 0.6);
    const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.position.set(0, -1.94, 0);
    cardGroup.add(hitMesh);

    // Silver Metallic Clasp & Ring (persis Alfari!)
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xdbeafe, metalness: 0.9, roughness: 0.18 });
    const claspBoxGeo = new THREE.BoxGeometry(0.46, 0.24, 0.12);
    const claspMesh = new THREE.Mesh(claspBoxGeo, silverMat);
    claspMesh.position.set(0, 0.04, 0);
    cardGroup.add(claspMesh);

    const hookGeo = new THREE.TorusGeometry(0.11, 0.032, 12, 24);
    const hookMesh = new THREE.Mesh(hookGeo, silverMat);
    hookMesh.position.set(0, -0.09, 0);
    cardGroup.add(hookMesh);

    // Load formal photo and chroma-key out red backdrop
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
      roughness: 0.78,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });
    let strapMesh = null;

    const updateStrapMesh = () => {
      if (strapMesh) {
        scene.remove(strapMesh);
        strapMesh.geometry.dispose();
      }
      const points = nodes.map((n) => n.pos.clone());
      const ribbonGeo = buildRibbonGeometry(points, 0.21);
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
