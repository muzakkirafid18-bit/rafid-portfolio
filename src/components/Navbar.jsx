import { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '// 01. About', href: '#about' },
    { name: '// 02. Stack', href: '#skills' },
    { name: '// 03. Projects', href: '#projects' },
    { name: '// 04. Education', href: '#education' },
    { name: '// 05. Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070913]/90 backdrop-blur-md border-b border-emerald-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 font-mono text-base sm:text-lg font-bold tracking-tight text-slate-100 hover:text-emerald-400 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="text-emerald-400">rafid</span>
          <span className="text-slate-400">@</span>
          <span className="text-slate-200 group-hover:text-white">backend:~</span>
          <span className="inline-block w-2 h-4 bg-emerald-400 animate-cursor-blink"></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs sm:text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-400 hover:text-emerald-400 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Icons & Status */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Open for Collab</span>
          </div>

          <a
            href="https://github.com/muzakkirafid18-bit"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all hover:scale-105"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rafid-muzakki-1069733a8/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:scale-105"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-emerald-400 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070a14]/95 backdrop-blur-xl border-b border-emerald-500/20 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-emerald-400 py-2 border-b border-slate-800/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Available for work
              </span>
              <div className="flex gap-2">
                <a
                  href="https://github.com/muzakkirafid18-bit"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-slate-800 text-slate-200"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rafid-muzakki-1069733a8/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-slate-800 text-slate-200"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
