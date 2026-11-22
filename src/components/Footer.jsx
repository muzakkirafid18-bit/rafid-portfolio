import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#04040d]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="font-mono text-lg font-bold text-white flex items-center gap-1.5">
              <span className="text-blue-400">&gt;_</span>
              <span>Rafid.dev</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Backend Developer & Database Architect from SMKN 1 Cibinong. Crafting clean APIs and solid relational systems.
            </p>
          </div>

          {/* Navigation */}
          <div className="hidden md:block md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Navigasi
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="#Home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#About" className="hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#Portofolio" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
              <li><a href="#api-playground" className="hover:text-blue-400 transition-colors">API Console</a></li>
              <li><a href="#Contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect & Back to Top */}
          <div className="md:col-span-4 flex flex-col md:items-end justify-between space-y-4">
            <div className="hidden md:block text-right space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Terhubung
              </h4>
              <div className="flex items-center justify-end gap-4 text-xs text-slate-400">
                <a href="https://github.com/muzakkirafid18-bit" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
                <a href="https://www.linkedin.com/in/rafid-muzakki-1069733a8/" target="_blank" rel="noreferrer" className="hover:text-blue-400">LinkedIn</a>
                <a href="https://www.instagram.com/812.raf/" target="_blank" rel="noreferrer" className="hover:text-pink-400">Instagram</a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-400/40 text-xs font-mono text-slate-300 hover:text-white transition-all w-fit"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-mono">
          <span>© {new Date().getFullYear()} RafidDev. All rights reserved.</span>
          <span>Built with React, Three.js & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
