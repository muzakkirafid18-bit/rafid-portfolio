import { useState, useEffect, useRef } from 'react';
import { Menu, X, Volume2, VolumeX, FileDown } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const chimeIntervalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playCosmicChime = (ctx, dest, freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 2.4);
    osc.connect(gain);
    gain.connect(dest);
    osc.start();
    osc.stop(ctx.currentTime + 2.5);
  };

  const toggleAudio = async () => {
    if (!audioEnabled) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          if (ctx.state === 'suspended') {
            await ctx.resume();
          }

          const master = ctx.createGain();
          master.gain.setValueAtTime(0.001, ctx.currentTime);
          master.gain.linearRampToValueAtTime(0.24, ctx.currentTime + 0.6);
          master.connect(ctx.destination);

          // Warm audible cosmic pad (C4, G4, B4, D5)
          const freqs = [130.81, 196.0, 246.94, 293.66];
          freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(f, ctx.currentTime);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1100, ctx.currentTime);

            const oscGain = ctx.createGain();
            oscGain.gain.setValueAtTime(idx === 0 ? 0.35 : 0.18, ctx.currentTime);

            osc.connect(filter);
            filter.connect(oscGain);
            oscGain.connect(master);
            osc.start();
          });

          // Immediate confirmation chime so user hears it right away
          playCosmicChime(ctx, master, 523.25);

          // Gentle periodic cosmic notes
          const notes = [523.25, 659.25, 587.33, 493.88, 783.99];
          let noteIdx = 0;
          chimeIntervalRef.current = setInterval(() => {
            if (audioCtxRef.current && masterGainRef.current) {
              playCosmicChime(audioCtxRef.current, masterGainRef.current, notes[noteIdx % notes.length]);
              noteIdx++;
            }
          }, 3200);

          audioCtxRef.current = ctx;
          masterGainRef.current = master;
        } else {
          if (audioCtxRef.current.state === 'suspended') {
            await audioCtxRef.current.resume();
          }
          masterGainRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
          masterGainRef.current.gain.linearRampToValueAtTime(0.24, audioCtxRef.current.currentTime + 0.4);
          playCosmicChime(audioCtxRef.current, masterGainRef.current, 523.25);
        }
        setAudioEnabled(true);
      } catch {
        setAudioEnabled(false);
      }
    } else {
      if (audioCtxRef.current && masterGainRef.current) {
        masterGainRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.35);
      }
      setAudioEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#Home' },
    { name: 'About', href: '#About' },
    { name: 'Portfolio', href: '#Portofolio' },
    { name: 'API Console', href: '#api-playground' },
    { name: 'Contact', href: '#Contact' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Floating Liquid Glass Pill */}
        <div
          className={`pointer-events-auto w-full sm:w-auto liquid-glass-nav rounded-full px-5 sm:px-7 py-2.5 flex items-center justify-between gap-4 sm:gap-8 transition-all duration-300 ${
            scrolled ? 'scale-[0.98] shadow-[0_12px_40px_rgba(37,99,235,0.22)]' : ''
          }`}
        >
          {/* Clean Brand Text (No AI Slop Icon) */}
          <a
            href="#Home"
            className="font-display font-bold text-base sm:text-lg tracking-tight text-white hover:text-blue-400 transition-colors shrink-0"
          >
            Rafid<span className="text-blue-400">Dev.</span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:to-indigo-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Controls: CV + Audio Toggle + Mobile Menu */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/CV_Rafid_Muzakki_Putra_Andryan.pdf"
              download="CV_Rafid_Muzakki_Putra_Andryan.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/20 hover:bg-blue-600/35 border border-blue-400/35 text-blue-300 hover:text-white text-xs font-mono font-medium transition-all"
              title="Unduh CV Resmi (PDF)"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>

            <button
              onClick={toggleAudio}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                audioEnabled
                  ? 'bg-blue-600/30 border-blue-400/50 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title={audioEnabled ? 'Matikan suara' : 'Nyalakan suara'}
              aria-label={audioEnabled ? 'Matikan suara' : 'Nyalakan suara'}
            >
              {audioEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden lg:inline">
                {audioEnabled ? 'Matikan suara' : 'Nyalakan suara'}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 hover:text-blue-400 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden mt-2 w-full liquid-glass-nav rounded-2xl p-4 space-y-2 animate-in fade-in">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/CV_Rafid_Muzakki_Putra_Andryan.pdf"
              download="CV_Rafid_Muzakki_Putra_Andryan.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-mono text-blue-300 hover:bg-blue-600/20 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span>Unduh CV (PDF)</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
