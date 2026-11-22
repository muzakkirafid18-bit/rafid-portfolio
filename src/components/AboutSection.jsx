import { Code2, FileText, ArrowUpRight } from 'lucide-react';

export default function AboutSection() {
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

          {/* Center Column (4 cols): Clean Cutout Portrait + Orbit + Spider-Man Hover Effect */}
          <div className="lg:col-span-4 flex justify-center relative">
            <div className="relative w-72 h-96 sm:w-80 sm:h-[430px] flex items-center justify-center group">
              
              {/* Subtle Orbit Rings behind portrait */}
              <div className="absolute w-72 h-72 rounded-full border border-blue-400/15 about-orbit-ring pointer-events-none">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6]"></span>
              </div>
              <div className="absolute w-56 h-56 rounded-full border border-indigo-400/15 about-orbit-ring-reverse pointer-events-none">
                <span className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
              </div>

              {/* Ambient Backlight (transitions from Cosmic Blue to Spider-Man Red on hover!) */}
              <div className="absolute inset-8 rounded-full bg-blue-600/15 group-hover:bg-red-600/30 blur-3xl transition-all duration-500 pointer-events-none"></div>

              {/* Clean Cutout Portrait (no garden/house background, blends seamlessly into #050510) */}
              <div
                className="relative w-full h-full flex items-end justify-center overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
                }}
              >
                <img
                  src="/about-rafid-clean.jpg"
                  alt="Rafid Muzakki Putra Andryan"
                  className="w-full h-full object-contain object-bottom mix-blend-lighten transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Spider-Man Suit Hover Reveal Overlay over torso & collar */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
                  style={{
                    maskImage: 'radial-gradient(ellipse 46% 38% at 32% 66%, black 30%, transparent 78%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 46% 38% at 32% 66%, black 30%, transparent 78%)',
                  }}
                >
                  {/* Red Suit Glow */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 32% 66%, rgba(220, 38, 38, 0.85), rgba(153, 27, 27, 0.55) 45%, transparent 75%)',
                    }}
                  ></div>

                  {/* Spider-Man Web Pattern & Emblem SVG */}
                  <svg
                    viewBox="0 0 200 260"
                    className="absolute inset-0 w-full h-full opacity-85"
                    fill="none"
                  >
                    <g stroke="#09090b" strokeWidth="1.6" strokeOpacity="0.85">
                      {/* Radial web lines centered on chest (x=64, y=172) */}
                      <line x1="64" y1="172" x2="20" y2="115" />
                      <line x1="64" y1="172" x2="64" y2="105" />
                      <line x1="64" y1="172" x2="115" y2="120" />
                      <line x1="64" y1="172" x2="125" y2="172" />
                      <line x1="64" y1="172" x2="112" y2="225" />
                      <line x1="64" y1="172" x2="64" y2="240" />
                      <line x1="64" y1="172" x2="18" y2="220" />
                      <line x1="64" y1="172" x2="8" y2="172" />
                      {/* Concentric web rings */}
                      <circle cx="64" cy="172" r="18" />
                      <circle cx="64" cy="172" r="34" />
                      <circle cx="64" cy="172" r="50" />
                    </g>
                    {/* Black Spider Chest Emblem */}
                    <g fill="#050507" transform="translate(64, 172)">
                      <ellipse cx="0" cy="2" rx="4.5" ry="7" />
                      <circle cx="0" cy="-7" r="3" />
                      <path d="M-4 -3 Q-14 -14 -17 -22 M-4 -1 Q-16 -5 -21 -12 M-4 2 Q-16 6 -20 15 M-3 5 Q-12 16 -14 25" stroke="#050507" strokeWidth="2.4" strokeLinecap="round" />
                      <path d="M4 -3 Q14 -14 17 -22 M4 -1 Q16 -5 21 -12 M4 2 Q16 6 20 15 M3 5 Q12 16 14 25" stroke="#050507" strokeWidth="2.4" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>
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
