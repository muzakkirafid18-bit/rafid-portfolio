import { useState, useEffect } from 'react';
import { ArrowRight, Code2, Database, Server, MapPin, Sparkles, Terminal, FileCode, CheckCircle2, FileDown } from 'lucide-react';
import TerminalWidget from './TerminalWidget';

export default function Hero() {
  const roles = [
    'Backend Developer',
    'Laravel Artisan',
    'PostgreSQL & MySQL Explorer',
    'Student at SMKN 1 Cibinong',
  ];
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[currentRoleIdx];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(current.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(current.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIdx]);

  return (
    <section id="about" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Intro & Headline */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-mono shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Backend Developer • Based in Cibinong, Bogor</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <p className="font-mono text-sm sm:text-base text-slate-400">
                Halo semua, saya biasa dipanggil <span className="text-emerald-400 font-semibold underline decoration-emerald-500/40">Rafid</span> 👋
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Rafid Muzakki <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Putra Andryan
                </span>
              </h1>
            </div>

            {/* Dynamic Animated Role */}
            <div className="h-10 flex items-center font-mono text-lg sm:text-2xl text-slate-300">
              <span className="text-emerald-400 mr-2 font-bold">&gt;</span>
              <span className="text-cyan-400">{displayedText}</span>
              <span className="inline-block w-2.5 h-6 bg-emerald-400 ml-1 animate-pulse"></span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              Siswa <span className="text-slate-200 font-medium">SMKN 1 Cibinong</span> yang berfokus mendalami arsitektur <span className="text-emerald-400 font-medium">Backend Development</span>, pembuatan REST API dengan <span className="text-emerald-400 font-medium">Laravel & PHP</span>, serta perancangan database relasional seperti <span className="text-cyan-400 font-medium">PostgreSQL & MySQL</span>. Selalu antusias memecahkan tantangan logika dan membangun aplikasi yang efisien.
            </p>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 max-w-xl">
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">3+</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1">Real Projects</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">2 DBs</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1">MySQL & Postgres</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-mono font-bold text-indigo-400">2x BNSP</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1">Target Bulan Ini</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold font-mono text-xs sm:text-sm shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Lihat Project Saya</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/CV_Rafid_Muzakki_Putra_Andryan.pdf"
                download="CV_Rafid_Muzakki_Putra_Andryan.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 font-mono text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                title="Download CV Resmi (PDF)"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span>Unduh CV (PDF)</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-700/80 hover:border-emerald-500/50 text-slate-200 hover:text-white font-mono text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                <span>Hubungi Saya</span>
              </a>

              <a
                href="https://github.com/muzakkirafid18-bit"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 text-xs sm:text-sm font-mono transition-all"
              >
                <Code2 className="w-4 h-4" />
                <span>GitHub Repos</span>
              </a>
            </div>

            {/* Location indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>Cibinong, Kab. Bogor, Jawa Barat, Indonesia</span>
            </div>

          </div>

          {/* Right Column: Profile Photo + Terminal Widget */}
          <div className="lg:col-span-5 relative space-y-6">
            
            {/* Profile Photo */}
            <div className="flex justify-center">
              <div className="relative group/photo">
                {/* Outer glow ring */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-emerald-500 opacity-60 blur-md group-hover/photo:opacity-100 group-hover/photo:blur-lg transition-all duration-500"></div>
                {/* Border ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-emerald-500 opacity-80"></div>
                {/* Photo container */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-slate-900">
                  <img
                    src="/rafid-foto.jpg"
                    alt="Rafid Muzakki Putra Andryan"
                    className="w-full h-full object-cover object-top scale-110 group-hover/photo:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Status dot */}
                <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-3 border-[#070b16] shadow-[0_0_10px_rgba(16,185,129,0.6)]">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40"></span>
                </div>
              </div>
            </div>

            {/* Terminal Widget */}
            <div className="relative group">
              {/* Outer decorative neon border glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              {/* Terminal */}
              <div className="relative">
                <TerminalWidget />
              </div>
            </div>

            {/* Mini hint badge below terminal */}
            <p className="text-[11px] font-mono text-slate-500 text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Terminal interaktif di atas bisa langsung diketik & dicoba!</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
