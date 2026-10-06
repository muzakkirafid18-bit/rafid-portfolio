import { ArrowUp, Terminal, Heart, Code2 } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-900 bg-[#04060d] text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <p className="text-slate-200 font-semibold">
              Rafid Muzakki Putra Andryan
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Backend Developer • SMKN 1 Cibinong
            </p>
          </div>
        </div>

        {/* Center / System Status */}
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300">Status: 200 OK</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-semibold">Ready for Vercel Deploy</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <p className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} Rafid. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-white transition-all hover:-translate-y-0.5"
            title="Kembali ke Atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
