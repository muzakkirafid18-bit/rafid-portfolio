import { ArrowRight, Code2, Sparkles, Terminal } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="About" className="py-20 sm:py-28 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            Introduction
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Portrait Stage with Cosmic Orbit Rings */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center group">
              
              {/* Ambient Glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-purple-500/30 blur-2xl group-hover:opacity-100 opacity-75 transition-opacity duration-500"></div>

              {/* Outer Orbit Ring 1 */}
              <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/30 about-orbit-ring pointer-events-none">
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_12px_#3b82f6]"></span>
              </div>

              {/* Inner Orbit Ring 2 */}
              <div className="absolute inset-5 rounded-full border border-indigo-400/25 about-orbit-ring-reverse pointer-events-none">
                <span className="absolute bottom-2 right-6 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#a855f7]"></span>
              </div>

              {/* Portrait Container with Hover 3D Glow Effect */}
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-1 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_40px_rgba(59,130,246,0.35)] group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#050510] relative">
                  <img
                    src="/rafid-foto.jpg"
                    alt="Rafid Muzakki Putra Andryan"
                    className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-all duration-500"
                  />
                  {/* Cyber/Cosmic Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-5">
                    <span className="px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/50 text-blue-200 font-mono text-[11px] flex items-center gap-1.5 backdrop-blur-md">
                      <Terminal className="w-3 h-3" /> Backend Artisan
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Tech Pill */}
              <div className="absolute -bottom-2 right-2 sm:right-6 px-3.5 py-1.5 rounded-full cosmic-card text-xs font-mono text-blue-300 flex items-center gap-1.5 shadow-lg">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Laravel & PHP</span>
              </div>
            </div>
          </div>

          {/* Right: Intro & Description */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-2xl sm:text-4xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Hi, I'm
              </span>{' '}
              <span className="text-white">Rafid Muzakki Putra Andryan</span>
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Saya seorang siswa <span className="text-white font-semibold">SMKN 1 Cibinong</span> jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) yang antusias merancang sistem di balik layar (*backend*). Mulai dari membangun aplikasi web manajemen sertifikasi profesi berarsitektur <span className="text-blue-300 font-medium">54 tabel relasional MySQL</span>, aplikasi E-Voting berbasis Laravel, hingga sistem desktop C# dengan SQL Server.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Saya percaya kode backend yang bersih, terstruktur, dan aman adalah fondasi utama dari setiap aplikasi yang hebat. Saat ini terus mendalami arsitektur API, normalisasi database, dan eksplorasi teknologi cloud modern seperti Supabase.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#Contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-0.5"
              >
                <span>Hubungi Saya</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#Portofolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Lihat Projek</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
