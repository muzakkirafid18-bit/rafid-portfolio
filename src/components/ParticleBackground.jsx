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

    // 1. NEURON SOMA NODES
    // Kepadatan tetap banyak dan seimbang (100 - 180 neuron)
    const neuronCount = Math.min(Math.max(Math.floor((width * height) / 8500), 100), 170);
    const neurons = [];

    for (let i = 0; i < neuronCount; i++) {
      const isCyan = Math.random() > 0.65;
      neurons.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 1.8,
        corePulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        energy: Math.random() * 0.25,
        isCyan: isCyan,
      });
    }

    // 2. SYNAPTIC ACTION POTENTIALS (Impuls Listrik halus)
    const pulses = [];

    const firePulse = (fromIdx, toIdx, speed = 0.03, isCyan = false) => {
      if (pulses.length > 40) return;
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
        if (dist < 260) {
          n.energy = 0.8;
          for (let j = 0; j < neurons.length; j++) {
            if (i !== j && Math.hypot(n.x - neurons[j].x, n.y - neurons[j].y) < 120) {
              firePulse(i, j, 0.04, n.isCyan);
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
      if (time - lastSpontaneousFire > 380) {
        lastSpontaneousFire = time;
        const sourceIdx = Math.floor(Math.random() * neurons.length);
        const source = neurons[sourceIdx];
        source.energy = 0.75;

        for (let j = 0; j < neurons.length; j++) {
          if (sourceIdx !== j) {
            const dist = Math.hypot(source.x - neurons[j].x, source.y - neurons[j].y);
            if (dist < 120) {
              firePulse(sourceIdx, j, Math.random() * 0.02 + 0.02, source.isCyan);
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

      // --- 1. JARINGAN KONEKSI ANTAR NEURON (HALUS & TIDAK SILAU) ---
      const maxDistance = 120;
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
              // Garis sinapsis aktif saat ada lonjakan sinyal
              ctx.strokeStyle = n1.isCyan
                ? `rgba(6, 182, 212, ${0.1 + energyBoost * 0.25})`
                : `rgba(16, 185, 129, ${0.1 + energyBoost * 0.25})`;
              ctx.lineWidth = 0.9;
            } else {
              // Garis sinapsis default yang tenang dan elegan
              ctx.strokeStyle = n1.isCyan
                ? `rgba(6, 182, 212, ${alphaRatio * 0.12})`
                : `rgba(16, 185, 129, ${alphaRatio * 0.11})`;
              ctx.lineWidth = 0.65;
            }
            ctx.stroke();
          }
        }

        // --- 2. INTERAKSI DENGAN MOUSE (TALI LEBIH LEMBUT & TIDAK MEMBUTAKAN MATA) ---
        if (mouse.isHovered) {
          const mouseDist = Math.hypot(n1.x - mouse.x, n1.y - mouse.y);
          const mouseRadius = 200;

          if (mouseDist < mouseRadius) {
            const mRatio = 1 - mouseDist / mouseRadius;

            // Gravitasi halus ke kursor
            n1.x += (mouse.x - n1.x) * mRatio * 0.015;
            n1.y += (mouse.y - n1.y) * mRatio * 0.015;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);

            // Garis penghubung kursor lembut & transparan
            ctx.strokeStyle = n1.isCyan
              ? `rgba(6, 182, 212, ${0.04 + mRatio * 0.2})`
              : `rgba(16, 185, 129, ${0.04 + mRatio * 0.2})`;
            ctx.lineWidth = 0.6 + mRatio * 0.5;
            ctx.stroke();

            // Naikkan energi sedang
            n1.energy = Math.max(n1.energy, mRatio * 0.5);

            // Sesekali tembak impuls halus ke kursor
            if (Math.random() < 0.018) {
              pulses.push({
                from: i,
                toMouse: true,
                progress: 0,
                speed: 0.035,
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

        // Kilatan listrik halus
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.shadowColor = pColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Ekor kilatan listrik
        const tailProgress = Math.max(0, pulse.progress - 0.12);
        const tx = fromNode.x + (targetX - fromNode.x) * tailProgress;
        const ty = fromNode.y + (targetY - fromNode.y) * tailProgress;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = pulse.isCyan ? 'rgba(6, 182, 212, 0.35)' : 'rgba(16, 185, 129, 0.35)';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        if (pulse.progress >= 1) {
          if (!pulse.toMouse && neurons[pulse.to]) {
            neurons[pulse.to].energy = 0.8;
          }
          pulses.splice(p, 1);
        }
      }

      // --- 4. BADAN SEL NEURON (SOMA) ---
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        const pulseFactor = 0.9 + Math.sin(n.corePulse) * 0.15;
        const r = n.radius * pulseFactor;

        const baseRgb = n.isCyan ? '6, 182, 212' : '16, 185, 129';
        const hexColor = n.isCyan ? '#06b6d4' : '#10b981';

        // Outer Halo Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * (2.2 + n.energy * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseRgb}, ${0.08 + n.energy * 0.22})`;
        ctx.fill();

        // Inner Membrane
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseRgb}, ${0.25 + n.energy * 0.35})`;
        ctx.fill();

        // Nucleus Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.energy > 0.4 ? '#ffffff' : hexColor;
        ctx.shadowColor = hexColor;
        ctx.shadowBlur = 8 + n.energy * 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Titik magnet halus pada kursor
      if (mouse.isHovered) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
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
