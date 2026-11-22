import { useState, useEffect, useRef } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const chimeIntervalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['Home', 'About', 'Portofolio', 'Contact'];
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
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

          playCosmicChime(ctx, master, 523.25);

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
    { name: 'Home', id: 'Home', href: '#Home' },
    { name: 'About', id: 'About', href: '#About' },
    { name: 'Portfolio', id: 'Portofolio', href: '#Portofolio' },
    { name: 'Contact', id: 'Contact', href: '#Contact' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Floating Liquid Glass Capsule (persis alfari.my.id) */}
        <div
          className={`pointer-events-auto w-full sm:w-auto liquid-glass-nav rounded-full px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-3 transition-all duration-300 ${
            scrolled ? 'shadow-[0_12px_40px_rgba(37,99,235,0.22)]' : ''
          }`}
        >
          {/* Mobile Brand */}
          <a
            href="#Home"
            className="md:hidden font-display font-bold text-sm tracking-tight text-white pl-2"
          >
            Rafid<span className="text-blue-400">Dev.</span>
          </a>

          {/* Desktop 4 Nav Links with Active Pill */}
          <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Divider + Circular Audio Button */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:block w-[1px] h-5 bg-white/15 mx-1"></div>

            <button
              onClick={toggleAudio}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                audioEnabled
                  ? 'bg-blue-600/30 border-blue-400/60 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  : 'bg-white/5 border-white/15 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title={audioEnabled ? 'Matikan suara' : 'Nyalakan suara'}
              aria-label={audioEnabled ? 'Matikan suara' : 'Nyalakan suara'}
            >
              {audioEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-slate-200 hover:text-blue-400 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden mt-2 w-full liquid-glass-nav rounded-2xl p-3 space-y-1 animate-in fade-in">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
