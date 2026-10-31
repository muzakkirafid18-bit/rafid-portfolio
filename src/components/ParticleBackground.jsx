import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates with smoothing & hover state
    let mouse = { x: -1000, y: -1000, isHovered: false };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovered = true;
    };
    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Click stimulates an instant synaptic shockwave!
    const handleClick = (e) => {
      triggerShockwave(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleClick);

    // 1. NEURON SOMA NODES (Lebih banyak, padat, dan jelas)
    // Kepadatan tinggi: sekitar 140 - 180 neuron di desktop!
    const neuronCount = Math.min(Math.max(Math.floor((width * height) / 8000), 100), 180);
    const neurons = [];

    for (let i = 0; i < neuronCount; i++) {
      const isCyan = Math.random() > 0.65;
      neurons.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 2.0, // Ukuran lebih jelas
        corePulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        energy: Math.random() * 0.3,
        isCyan: isCyan,
      });
    }

    // 2. SYNAPTIC ACTION POTENTIALS (Impuls Listrik yang bergerak di serabut akson)
    const pulses = [];

    const firePulse = (fromIdx, toIdx, speed = 0.03, isCyan = false) => {
      if (pulses.length > 50) return;
      pulses.push({
        from: fromIdx,
        to: toIdx,
        progress: 0,
        speed: speed,
        isCyan: isCyan,
      });
    };

    const triggerShockwave = (x, y) => {
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        const dist = Math.hypot(n.x - x, n.y - y);
        if (dist < 280) {
          n.energy = 1.0;
          for (let j = 0; j < neurons.length; j++) {
            if (i !== j && Math.hypot(n.x - neurons[j].x, n.y - neurons[j].y) < 130) {
              firePulse(i, j, 0.045, n.isCyan);
            }
          }
        }
      }
    };

    // Auto spontaneous synaptic firing
    let lastSpontaneousFire = 0;

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Spontaneous firing antar neuron
      if (time - lastSpontaneousFire > 320) {
        lastSpontaneousFire = time;
        const sourceIdx = Math.floor(Math.random() * neurons.length);
        const source = neurons[sourceIdx];
        source.energy = 0.9;

        for (let j = 0; j < neurons.length; j++) {
          if (sourceIdx !== j) {
            const dist = Math.hypot(source.x - neurons[j].x, source.y - neurons[j].y);
            if (dist < 125) {
              firePulse(sourceIdx, j, Math.random() * 0.025 + 0.02, source.isCyan);
            }
          }
        }
      }

      // Update posisi neuron
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 10) { n.x = 10; n.vx *= -1; }
        if (n.x > width - 10) { n.x = width - 10; n.vx *= -1; }
        if (n.y < 10) { n.y = 10; n.vy *= -1; }
        if (n.y > height - 10) { n.y = height - 10; n.vy *= -1; }

        if (n.energy > 0.05) {
          n.energy *= 0.95;
        }

        n.corePulse += n.pulseSpeed;
      }

      // --- 1. JARINGAN AKSON & DENDRIT (KONEKSI ANTAR NEURON) ---
      const maxDistance = 125;
      for (let i = 0; i < neurons.length; i++) {
        const n1 = neurons[i];

        for (let j = i + 1; j < neurons.length; j++) {
          const n2 = neurons[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

          if (dist < maxDistance) {
            const alphaRatio = 1 - dist / maxDistance;
            const energyBoost = Math.max(n1.energy, n2.energy);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            if (energyBoost > 0.25) {
              // Garis sinapsis aktif terang
              ctx.strokeStyle = n1.isCyan
                ? `rgba(6, 182, 212, ${0.25 + energyBoost * 0.55})`
                : `rgba(16, 185, 129, ${0.25 + energyBoost * 0.55})`;
              ctx.lineWidth = 1.4;
            } else {
              // Garis sinapsis biasa (dibuat lebih kontras & jelas)
              ctx.strokeStyle = n1.isCyan
                ? `rgba(6, 182, 212, ${alphaRatio * 0.25})`
                : `rgba(16, 185, 129, ${alphaRatio * 0.22})`;
              ctx.lineWidth = 0.9;
            }
            ctx.stroke();
          }
        }

        // --- 2. INTERAKSI DENGAN MOUSE (KONEKSI KURSOR SANGAT PADAT & JELAS) ---
        if (mouse.isHovered) {
          const mouseDist = Math.hypot(n1.x - mouse.x, n1.y - mouse.y);
          const mouseRadius = 220; // Jangkauan tarikan kursor lebih luas!

          if (mouseDist < mouseRadius) {
            const mRatio = 1 - mouseDist / mouseRadius;

            // Tarik sedikit neuron ke arah kursor (Gravitasi interaktif)
            n1.x += (mouse.x - n1.x) * mRatio * 0.02;
            n1.y += (mouse.y - n1.y) * mRatio * 0.02;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);

            // Garis penghubung kursor tebal dan menyala emerald/cyan
            ctx.strokeStyle = n1.isCyan
              ? `rgba(6, 182, 212, ${0.2 + mRatio * 0.7})`
              : `rgba(16, 185, 129, ${0.2 + mRatio * 0.75})`;
            ctx.lineWidth = 1.0 + mRatio * 1.5;
            ctx.stroke();

            // Aktifkan energi neuron di sekitar kursor
            n1.energy = Math.max(n1.energy, mRatio * 0.85);

            // Tembakkan impuls ke kursor secara dinamis
            if (Math.random() < 0.025) {
              pulses.push({
                from: i,
                toMouse: true,
                progress: 0,
                speed: 0.04,
                isCyan: n1.isCyan,
              });
            }
          }
        }
      }

      // --- 3. IMPULS LISTRIK SINAPSIS YANG MELUNCUR (ACTION POTENTIALS) ---
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        const fromNode = neurons[pulse.from];
        let targetX, targetY;

        if (pulse.toMouse) {
          targetX = mouse.x;
          targetY = mouse.y;
        } else {
          const toNode = neurons[pulse.to];
          if (!toNode) {
            pulses.splice(p, 1);
            continue;
          }
          targetX = toNode.x;
          targetY = toNode.y;
        }

        if (!fromNode) {
          pulses.splice(p, 1);
          continue;
        }

        const px = fromNode.x + (targetX - fromNode.x) * pulse.progress;
        const py = fromNode.y + (targetY - fromNode.y) * pulse.progress;

        const pColor = pulse.isCyan ? '#06b6d4' : '#10b981';

        // Kilatan listrik
        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.shadowColor = pColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Ekor kilatan listrik
        const tailProgress = Math.max(0, pulse.progress - 0.15);
        const tx = fromNode.x + (targetX - fromNode.x) * tailProgress;
        const ty = fromNode.y + (targetY - fromNode.y) * tailProgress;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = pulse.isCyan ? 'rgba(6, 182, 212, 0.7)' : 'rgba(16, 185, 129, 0.7)';
        ctx.lineWidth = 2.2;
        ctx.stroke();

        if (pulse.progress >= 1) {
          if (!pulse.toMouse && neurons[pulse.to]) {
            neurons[pulse.to].energy = 0.95; // Flashing neuron saat impuls sampai
          }
          pulses.splice(p, 1);
        }
      }

      // --- 4. BADAN SEL NEURON (SOMA & GLOW INTI) ---
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        const pulseFactor = 0.85 + Math.sin(n.corePulse) * 0.2;
        const r = n.radius * pulseFactor;

        const baseRgb = n.isCyan ? '6, 182, 212' : '16, 185, 129';
        const hexColor = n.isCyan ? '#06b6d4' : '#10b981';

        // Outer Halo Glow (Lebih jelas dan bercahaya)
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * (2.8 + n.energy * 2.2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseRgb}, ${0.12 + n.energy * 0.35})`;
        ctx.fill();

        // Inner Cell Membrane
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseRgb}, ${0.35 + n.energy * 0.45})`;
        ctx.fill();

        // Nucleus Core (Padat dan Terang)
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.energy > 0.35 ? '#ffffff' : hexColor;
        ctx.shadowColor = hexColor;
        ctx.shadowBlur = 12 + n.energy * 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Titik magnet pusat pada kursor
      if (mouse.isHovered) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
