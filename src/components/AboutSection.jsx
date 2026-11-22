import { useState, useRef } from 'react';
import { Code2, FileText, ArrowUpRight } from 'lucide-react';

export default function AboutSection() {
  const portraitRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e) => {
    const el = portraitRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursor({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setCursor((prev) => ({ ...prev, active: false }));
  };

  const maskStyle = cursor.active
    ? {
        maskImage: `radial-gradient(circle 92px at ${cursor.x}% ${cursor.y}%, black 48%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 92px at ${cursor.x}% ${cursor.y}%, black 48%, transparent 100%)`,
      }
    : {
        maskImage: 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
        WebkitMaskImage: 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
      };

  return (
    <section id="About" className="py-24 sm:py-32 relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Top Title (just like alfari.my.id) */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            About Me
          </h2>
        </div>

        {/* 3-Column Layout: Left Name+CTA | Center Portrait | Right Bio+CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Column (4 cols): Hi, I'm + Name + Hubungi Saya */}
          <div className="lg:col-span-4 space-y-5 text-center lg:text-left">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight">
              <span className="text-blue-500">Hi, I&apos;m</span>
              <br />
              <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Rafid Muzakki
              </span>
              <br />
              <span className="bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent">
                Putra Andryan
              </span>
            </h3>

            <div className="pt-2 flex justify-center lg:justify-start">
              <a
                href="#Contact"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(59,130,246,0.65)] transition-all hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4" />
                <span>Hubungi Saya</span>
              </a>
            </div>
          </div>

          {/* Center Column (4 cols): Portrait Stage with Cursor-Tracked Spider-Man Spotlight Reveal */}
          <div className="lg:col-span-4 flex justify-center relative">
            <div className="relative w-72 sm:w-80 aspect-[3/4] flex items-center justify-center group">
              
              {/* Subtle Orbit Rings behind portrait */}
              <div className="absolute w-72 h-72 rounded-full border border-blue-400/15 about-orbit-ring pointer-events-none">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6]"></span>
              </div>
              <div className="absolute w-56 h-56 rounded-full border border-indigo-400/15 about-orbit-ring-reverse pointer-events-none">
                <span className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
              </div>

              {/* Ambient Backlight */}
              <div
                className={`absolute inset-8 rounded-full blur-3xl transition-all duration-500 pointer-events-none ${
                  cursor.active ? 'bg-red-600/25' : 'bg-blue-600/15'
                }`}
              ></div>

              {/* 3:4 Portrait Box matching image aspect ratio 1:1 */}
              <div
                ref={portraitRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-full overflow-hidden cursor-none"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                }}
              >
                {/* Base Clean Photo (no garden/house background) */}
                <img
                  src="/about-rafid-clean.jpg"
                  alt="Rafid Muzakki Putra Andryan"
                  className="w-full h-full object-cover mix-blend-lighten select-none pointer-events-none"
                />

                {/* Cursor Spotlight Reveal Layer: Spider-Man Mask (Head) + Suit (Torso) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                  style={{
                    ...maskStyle,
                    opacity: cursor.active ? 1 : 0,
                  }}
                >
                  <svg viewBox="0 0 300 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      {/* Realistic 3D Spider-Man Red Shading */}
                      <radialGradient id="spideyHeadGrad" cx="62%" cy="42%" r="58%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="55%" stopColor="#b91c1c" />
                        <stop offset="100%" stopColor="#450a0a" />
                      </radialGradient>
                      <radialGradient id="spideySuitGrad" cx="45%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#dc2626" />
                        <stop offset="60%" stopColor="#991b1b" />
                        <stop offset="100%" stopColor="#3b0712" />
                      </radialGradient>
                      {/* Clip path matching Rafid's exact head & neck silhouette */}
                      <clipPath id="headMaskClip">
                        <path d="M 105 182 C 92 162, 92 128, 125 122 C 155 117, 178 140, 177 168 C 176 184, 166 196, 152 204 C 138 212, 118 220, 108 210 Z" />
                      </clipPath>
                      {/* Clip path matching Rafid's torso & shirt */}
                      <clipPath id="torsoSuitClip">
                        <path d="M 0 218 C 35 198, 72 195, 108 210 C 122 238, 128 282, 134 328 L 106 365 L 105 400 L 0 400 Z" />
                      </clipPath>
                    </defs>

                    {/* 1. SPIDER-MAN SUIT ON TORSO / COLLAR */}
                    <g clipPath="url(#torsoSuitClip)">
                      <rect x="0" y="190" width="160" height="220" fill="url(#spideySuitGrad)" />
                      {/* Black Webbing across Chest & Shoulders */}
                      <g stroke="#09090b" strokeWidth="1.6" strokeOpacity="0.82" fill="none">
                        {/* Radiating lines from chest center (68, 285) */}
                        <line x1="68" y1="285" x2="10" y2="210" />
                        <line x1="68" y1="285" x2="55" y2="195" />
                        <line x1="68" y1="285" x2="105" y2="205" />
                        <line x1="68" y1="285" x2="138" y2="255" />
                        <line x1="68" y1="285" x2="135" y2="335" />
                        <line x1="68" y1="285" x2="95" y2="400" />
                        <line x1="68" y1="285" x2="40" y2="400" />
                        <line x1="68" y1="285" x2="0" y2="345" />
                        <line x1="68" y1="285" x2="0" y2="280" />
                        {/* Concentric curved webs */}
                        <circle cx="68" cy="285" r="22" />
                        <circle cx="68" cy="285" r="44" />
                        <circle cx="68" cy="285" r="68" />
                        <circle cx="68" cy="285" r="95" />
                      </g>
                      {/* Iconic Black Spider Chest Emblem */}
                      <g fill="#050507" transform="translate(74, 285) rotate(8)">
                        <ellipse cx="0" cy="2" rx="4.5" ry="7.5" />
                        <circle cx="0" cy="-7" r="3" />
                        <path
                          d="M-4 -3 Q-14 -14 -17 -23 M-4 -1 Q-16 -5 -22 -12 M-4 2 Q-16 6 -21 15 M-3 5 Q-12 16 -14 25"
                          stroke="#050507"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4 -3 Q14 -14 17 -23 M4 -1 Q16 -5 22 -12 M4 2 Q16 6 21 15 M3 5 Q12 16 14 25"
                          stroke="#050507"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </g>
                    </g>

                    {/* 2. SPIDER-MAN MASK ON HEAD / FACE (Side-profile facing down-right) */}
                    <g clipPath="url(#headMaskClip)">
                      <rect x="85" y="115" width="100" height="110" fill="url(#spideyHeadGrad)" />
                      {/* Web lines radiating from nose bridge (160, 168) */}
                      <g stroke="#09090b" strokeWidth="1.35" strokeOpacity="0.8" fill="none">
                        <line x1="160" y1="168" x2="105" y2="122" />
                        <line x1="160" y1="168" x2="145" y2="115" />
                        <line x1="160" y1="168" x2="180" y2="132" />
                        <line x1="160" y1="168" x2="185" y2="168" />
                        <line x1="160" y1="168" x2="172" y2="205" />
                        <line x1="160" y1="168" x2="132" y2="215" />
                        <line x1="160" y1="168" x2="95" y2="195" />
                        <line x1="160" y1="168" x2="90" y2="158" />
                        <circle cx="160" cy="168" r="14" />
                        <circle cx="160" cy="168" r="28" />
                        <circle cx="160" cy="168" r="44" />
                        <circle cx="160" cy="168" r="62" />
                      </g>

                      {/* Side-Profile White Spider-Man Eye Lens */}
                      <path
                        d="M 149 156 C 156 149, 169 152, 173 159 C 169 167, 156 168, 149 156 Z"
                        fill="#f8fafc"
                        stroke="#09090b"
                        strokeWidth="3.2"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>

                {/* Cyan Cursor Dot Indicator (like Alfari's screenshot!) */}
                {cursor.active && (
                  <span
                    className="absolute w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] pointer-events-none"
                    style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
                  ></span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): 2 Paragraphs Bio + Lihat Projek */}
          <div className="lg:col-span-4 space-y-5 text-center lg:text-left">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Saya adalah <strong className="text-white font-semibold">Backend Developer</strong> yang berfokus pada pengembangan arsitektur sistem yang fungsional sekaligus skalabel. Saya senang memadukan logika kode, perancangan database relasional, dan API untuk membangun aplikasi yang andal.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Dengan <span className="text-slate-200 font-medium">PHP Native, Laravel, MySQL, dan PostgreSQL</span>, saya mengubah kebutuhan sistem kompleks menjadi layanan backend yang rapi, aman, dan berdampak nyata.
            </p>

            <div className="pt-2 flex justify-center lg:justify-start">
              <a
                href="#Portofolio"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-blue-400/50 text-slate-200 hover:text-white font-mono text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>Lihat Projek</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
