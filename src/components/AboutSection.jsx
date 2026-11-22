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
        maskImage: `radial-gradient(circle 95px at ${cursor.x}% ${cursor.y}%, black 52%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 95px at ${cursor.x}% ${cursor.y}%, black 52%, transparent 100%)`,
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

          {/* Center Column (4 cols): Pure Subject Cutout + Orbit + Spider-Man Spotlight */}
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

              {/* 3:4 Portrait Stage */}
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
                {/* Layer 1: Pure Subject Cutout (background 100% removed via SVG silhouette clip) */}
                <svg viewBox="0 0 300 400" className="w-full h-full select-none pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="rafidSubjectClip">
                      <path d="M 116 34 C 142 36, 157 56, 157 86 C 166 94, 166 116, 156 128 C 158 136, 165 146, 178 152 C 220 162, 246 194, 260 250 L 266 294 L 258 300 C 268 338, 274 374, 271 400 L 89 400 C 96 368, 105 332, 106 322 C 95 304, 76 287, 76 283 C 85 246, 102 204, 114 176 C 102 178, 88 168, 82 155 L 75 147 C 70 135, 67 122, 65 108 C 61 94, 60 84, 62 74 C 66 48, 90 34, 116 34 Z" />
                    </clipPath>
                  </defs>
                  <image
                    href="/about-rafid-new.jpg"
                    x="0"
                    y="0"
                    width="300"
                    height="400"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#rafidSubjectClip)"
                  />
                </svg>

                {/* Layer 2: Cursor Spotlight Reveal (Spider-Man Mask + Big Eyes + Suit) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                  style={{
                    ...maskStyle,
                    opacity: cursor.active ? 1 : 0,
                  }}
                >
                  <svg viewBox="0 0 300 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="spideyHeadGrad" cx="35%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="55%" stopColor="#b91c1c" />
                        <stop offset="100%" stopColor="#450a0a" />
                      </radialGradient>
                      <radialGradient id="spideySuitGrad" cx="45%" cy="42%" r="65%">
                        <stop offset="0%" stopColor="#dc2626" />
                        <stop offset="60%" stopColor="#991b1b" />
                        <stop offset="100%" stopColor="#3b0712" />
                      </radialGradient>
                      {/* Head silhouette matching cropped photo */}
                      <clipPath id="headMaskClip">
                        <path d="M 62 74 C 66 46, 90 34, 116 34 C 142 36, 157 56, 157 86 C 166 94, 166 116, 156 128 C 154 142, 134 166, 114 176 C 102 178, 88 168, 82 155 L 75 147 C 70 135, 67 122, 65 108 C 61 94, 60 84, 62 74 Z" />
                      </clipPath>
                      {/* Torso / White T-shirt silhouette following the V-neck collar */}
                      <clipPath id="torsoSuitClip">
                        <path d="M 114 176 C 118 196, 122 212, 126 216 C 142 198, 158 172, 178 152 C 220 162, 246 194, 260 250 L 266 294 L 222 302 L 225 400 L 89 400 L 106 322 L 76 283 L 104 202 Z" />
                      </clipPath>
                    </defs>

                    {/* 1. SPIDER-MAN SUIT ON WHITE T-SHIRT (blended so shirt folds stay realistic!) */}
                    <g clipPath="url(#torsoSuitClip)" style={{ mixBlendMode: 'multiply' }}>
                      <rect x="65" y="145" width="210" height="260" fill="url(#spideySuitGrad)" />
                      {/* Webbing radiating from chest center (142, 268) */}
                      <g stroke="#09090b" strokeWidth="1.6" strokeOpacity="0.85" fill="none">
                        <line x1="142" y1="268" x2="105" y2="165" />
                        <line x1="142" y1="268" x2="175" y2="150" />
                        <line x1="142" y1="268" x2="235" y2="180" />
                        <line x1="142" y1="268" x2="265" y2="268" />
                        <line x1="142" y1="268" x2="225" y2="395" />
                        <line x1="142" y1="268" x2="142" y2="400" />
                        <line x1="142" y1="268" x2="90" y2="395" />
                        <line x1="142" y1="268" x2="75" y2="285" />
                        <circle cx="142" cy="268" r="22" />
                        <circle cx="142" cy="268" r="44" />
                        <circle cx="142" cy="268" r="70" />
                        <circle cx="142" cy="268" r="98" />
                      </g>
                      {/* Black Spider Chest Emblem */}
                      <g fill="#050507" transform="translate(142, 268) rotate(-8)">
                        <ellipse cx="0" cy="2" rx="5.5" ry="9" />
                        <circle cx="0" cy="-9" r="3.5" />
                        <path
                          d="M-4 -3 Q-16 -16 -20 -26 M-4 -1 Q-18 -5 -25 -13 M-4 2 Q-18 6 -24 16 M-3 5 Q-14 18 -16 28"
                          stroke="#050507"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4 -3 Q16 -16 20 -26 M4 -1 Q18 -5 25 -13 M4 2 Q18 6 24 16 M3 5 Q14 18 16 28"
                          stroke="#050507"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                        />
                      </g>
                    </g>

                    {/* 2. SPIDER-MAN MASK ON HEAD (Big Iconic White Eye Lenses!) */}
                    <g clipPath="url(#headMaskClip)">
                      <rect x="55" y="30" width="120" height="160" fill="url(#spideyHeadGrad)" />
                      {/* Web lines radiating from nose bridge (92, 124) */}
                      <g stroke="#09090b" strokeWidth="1.4" strokeOpacity="0.82" fill="none">
                        <line x1="92" y1="124" x2="62" y2="75" />
                        <line x1="92" y1="124" x2="96" y2="35" />
                        <line x1="92" y1="124" x2="148" y2="42" />
                        <line x1="92" y1="124" x2="168" y2="95" />
                        <line x1="92" y1="124" x2="155" y2="155" />
                        <line x1="92" y1="124" x2="112" y2="180" />
                        <line x1="92" y1="124" x2="72" y2="165" />
                        <line x1="92" y1="124" x2="62" y2="128" />
                        <circle cx="92" cy="124" r="15" />
                        <circle cx="92" cy="124" r="30" />
                        <circle cx="92" cy="124" r="47" />
                        <circle cx="92" cy="124" r="66" />
                      </g>

                      {/* BIG Iconic Left Spider-Man Eye Lens */}
                      <path
                        d="M 65 110 C 66 92, 83 96, 89 114 C 84 126, 70 124, 65 110 Z"
                        fill="#f8fafc"
                        stroke="#09090b"
                        strokeWidth="4.2"
                        strokeLinejoin="round"
                      />
                      {/* BIG Iconic Right Spider-Man Eye Lens */}
                      <path
                        d="M 99 116 C 106 96, 134 91, 141 104 C 134 125, 110 130, 99 116 Z"
                        fill="#f8fafc"
                        stroke="#09090b"
                        strokeWidth="4.5"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>

                {/* Cyan Cursor Dot Indicator */}
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
