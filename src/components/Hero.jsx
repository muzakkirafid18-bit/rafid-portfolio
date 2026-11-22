import { useState, useEffect } from 'react';
import { ArrowRight, FileDown, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import Lanyard3D from './Lanyard3D';

export default function Hero() {
  const roles = [
    'Backend Developer',
    'Laravel & PHP Native Artisan',
    'MySQL & PostgreSQL Architect',
    'Student at SMKN 1 Cibinong',
  ];
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[currentRoleIdx];
    const typingSpeed = isDeleting ? 40 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(current.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1700);
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
    <section id="Home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-visible min-h-[680px]">
      {/* Full-Hero Top-Layer 3D Lanyard Overlay (never clipped when dragged!) */}
      <Lanyard3D />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Cosmic Intro & CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-mono shadow-[0_0_24px_rgba(37,99,235,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Backend Developer • SMKN 1 Cibinong</span>
            </div>

            {/* Display Heading */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="text-white">My Portfolio</span>
              </h1>
            </div>

            {/* Typewriter Role */}
            <div className="h-9 flex items-center font-mono text-base sm:text-xl text-slate-300">
              <span className="text-blue-400 mr-2 font-bold">&gt;</span>
              <span className="text-indigo-300 font-medium">{displayedText}</span>
              <span className="inline-block w-2 h-5 bg-blue-400 ml-1 animate-cursor-blink"></span>
            </div>

            {/* Bio */}
            <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-xl">
              Halo! Saya <span className="text-white font-semibold">Rafid Muzakki Putra Andryan</span>, siswa jurusan PPLG di <span className="text-blue-300 font-medium">SMKN 1 Cibinong</span> yang berfokus membangun arsitektur backend, RESTful API, dan perancangan database relasional berskala produksi menggunakan <span className="text-indigo-300 font-medium">PHP, Laravel, MySQL & PostgreSQL</span>.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#Portofolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_30px_rgba(37,99,235,0.45)] hover:shadow-[0_0_40px_rgba(59,130,246,0.65)] transition-all hover:-translate-y-0.5"
              >
                <span>Lihat Projek</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/CV_Rafid_Muzakki_Putra_Andryan.pdf"
                download="CV_Rafid_Muzakki_Putra_Andryan.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-400/30 hover:border-blue-400/60 text-blue-200 hover:text-white font-mono text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                <FileDown className="w-4 h-4 text-blue-400" />
                <span>Unduh CV (PDF)</span>
              </a>

              <a
                href="#Contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                <span>Hubungi Saya</span>
              </a>
            </div>

            {/* FIND ME Row */}
            <div className="pt-4 flex items-center gap-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
                Find Me
              </span>
              <div className="h-[1px] w-8 bg-slate-800"></div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/muzakkirafid18-bit"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-blue-400/50 hover:bg-blue-600/20 transition-all"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rafid-muzakki-1069733a8/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-600/20 transition-all"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/812.raf/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-600/15 transition-all"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Spacer & Ambient Glow for Top-Layer 3D Lanyard */}
          <div className="lg:col-span-5 relative h-[460px] sm:h-[520px] flex flex-col items-center justify-end pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-600/20 blur-[95px]"></div>
            <p className="text-[11px] font-mono text-slate-400/80 mb-2">
              ✦ Tarik & geser kartu ID 3D sampai ujung layar
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
