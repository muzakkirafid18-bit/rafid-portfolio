import { useEffect, useRef } from 'react';

export default function CosmicBackground() {
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

    // Subtle mouse parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / width - 0.5) * 20;
      mouse.targetY = (e.clientY / height - 0.5) * 20;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 1. Starfield
    const starCount = Math.min(Math.floor((width * height) / 5500), 260);
    const stars = Array.from({ length: starCount }, () => {
      const palette = ['#ffffff', '#bfdbfe', '#93c5fd', '#c7d2fe', '#e9d5ff'];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        depth: Math.random() * 0.8 + 0.2,
        alpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        phase: Math.random() * Math.PI * 2,
        color: palette[Math.floor(Math.random() * palette.length)],
      };
    });

    // 2. Shooting Stars
    const shootingStars = [];
    let lastShootingStar = 0;

    const spawnShootingStar = () => {
      const startX = Math.random() * width * 0.8 + width * 0.1;
      const startY = Math.random() * height * 0.35;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: -(Math.random() * 6 + 7),
        vy: Math.random() * 4 + 4,
        length: Math.random() * 90 + 70,
        alpha: 1,
      });
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.twinkleSpeed;
        const twinkle = 0.55 + Math.sin(s.phase) * 0.45;
        const drawX = (s.x - mouse.x * s.depth + width) % width;
        const drawY = (s.y - mouse.y * s.depth + height) % height;

        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha * twinkle;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Spawn Shooting Star every ~3.5 - 6 seconds
      if (time - lastShootingStar > 4200 && Math.random() < 0.04) {
        lastShootingStar = time;
        spawnShootingStar();
      }

      // Draw Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const st = shootingStars[i];
        st.x += st.vx;
        st.y += st.vy;
        st.alpha -= 0.018;

        if (st.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const norm = Math.hypot(st.vx, st.vy);
        const tailX = st.x - (st.vx / norm) * st.length;
        const tailY = st.y - (st.vy / norm) * st.length;

        const grad = ctx.createLinearGradient(st.x, st.y, tailX, tailY);
        grad.addColorStop(0, `rgba(191, 219, 254, ${st.alpha})`);
        grad.addColorStop(0.4, `rgba(59, 130, 246, ${st.alpha * 0.6})`);
        grad.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(st.x, st.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${st.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050510]">
      {/* Cosmic Nebula & Planet Silhouettes */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-blue-600/12 blur-[130px]"></div>
      <div className="absolute top-1/3 -right-48 w-[560px] h-[560px] rounded-full bg-indigo-600/12 blur-[150px]"></div>
      <div className="absolute -bottom-52 left-1/4 w-[620px] h-[620px] rounded-full bg-purple-600/10 blur-[160px]"></div>

      {/* Subtle Glowing Planet Silhouette (Top Right) */}
      <div
        className="hidden md:block absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.35), rgba(30, 58, 138, 0.12) 55%, transparent 72%)',
          boxShadow: 'inset -20px -20px 60px rgba(5, 5, 16, 0.9)',
        }}
      ></div>

      {/* Subtle Glowing Planet Silhouette (Bottom Left) */}
      <div
        className="hidden md:block absolute bottom-10 -left-28 w-64 h-64 rounded-full opacity-25 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.3), rgba(49, 46, 129, 0.12) 55%, transparent 72%)',
          boxShadow: 'inset 16px -16px 50px rgba(5, 5, 16, 0.95)',
        }}
      ></div>

      <canvas ref={canvasRef} className="w-full h-full relative z-10" />
    </div>
  );
}
