import { Code2, FileText, ArrowUpRight, Terminal } from 'lucide-react';

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

          {/* Center Column (4 cols): Portrait Stage with Orbit + Hacker Hoodie Hover */}
          <div className="lg:col-span-4 flex justify-center relative">
            <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] flex items-center justify-center group">
              
              {/* Subtle Orbit Rings behind portrait */}
              <div className="absolute w-72 h-72 rounded-full border border-blue-400/15 about-orbit-ring pointer-events-none">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6]"></span>
              </div>
              <div className="absolute w-56 h-56 rounded-full border border-indigo-400/15 about-orbit-ring-reverse pointer-events-none">
                <span className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7]"></span>
              </div>

              {/* Ambient Cosmic Backlight */}
              <div className="absolute inset-8 rounded-full bg-blue-600/15 group-hover:bg-blue-500/30 blur-3xl transition-all duration-500 pointer-events-none"></div>

              {/* Portrait Container (blends smoothly into #050510) */}
              <div
                className="relative w-full h-full flex items-end justify-center overflow-hidden rounded-3xl"
                style={{
                  maskImage: 'radial-gradient(ellipse 82% 85% at 50% 48%, black 52%, transparent 96%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 82% 85% at 50% 48%, black 52%, transparent 96%)',
                }}
              >
                {/* Base Photo */}
                <img
                  src="/about-rafid.jpg"
                  alt="Rafid Muzakki Putra Andryan"
                  className="w-full h-full object-cover object-center transition-all duration-500 group-hover:opacity-0"
                />

                {/* Hacker Hoodie Hover Image (smooth crossfade just like Spider-Man hover) */}
                <img
                  src="/about-rafid-hacker.jpg"
                  alt="Rafid Muzakki Hacker Hoodie"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.03]"
                />

                {/* Hacker Mode Badge */}
                <div className="absolute inset-x-0 bottom-7 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-blue-950/85 border border-blue-400/50 text-blue-200 font-mono text-[10px] backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_20px_rgba(59,130,246,0.45)]">
                    <Terminal className="w-3 h-3 text-blue-400" />
                    <span>&lt;hacker_mode /&gt;</span>
                  </span>
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
