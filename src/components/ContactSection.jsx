import { useState } from 'react';
import { MessageSquare, Copy, Check, Send, MapPin, Sparkles, Terminal, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, DiscordIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const discordUsername = 'rafid_muzakki_40241';

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(discordUsername);
    setCopiedDiscord(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#5865F2', '#10b981', '#ffffff'],
    });
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;

    setSentSuccess(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#6366f1'],
    });

    setTimeout(() => {
      setSentSuccess(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  const socials = [
    {
      name: 'GitHub',
      handle: '@muzakkirafid18-bit',
      url: 'https://github.com/muzakkirafid18-bit',
      icon: <GithubIcon className="w-5 h-5" />,
      color: 'hover:text-white hover:border-slate-600',
    },
    {
      name: 'LinkedIn',
      handle: 'Rafid Muzakki',
      url: 'https://www.linkedin.com/in/rafid-muzakki-1069733a8/',
      icon: <LinkedinIcon className="w-5 h-5" />,
      color: 'hover:text-cyan-400 hover:border-cyan-500/40',
    },
    {
      name: 'Instagram',
      handle: '@812.raf',
      url: 'https://www.instagram.com/812.raf/',
      icon: <InstagramIcon className="w-5 h-5" />,
      color: 'hover:text-pink-400 hover:border-pink-500/40',
    },
  ];

  return (
    <section id="contact" className="py-24 relative border-t border-slate-900 bg-[#050710]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-emerald-400 text-xs sm:text-sm tracking-wide mb-2">
            <span>// 05. INITIATE PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mari Terhubung & Kolaborasi
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Punya ide proyek, diskusi seputar backend development, atau ingin berkenalan? Pintu komunikasi selalu terbuka!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Cards: Socials & Discord (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Discord Special Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#5865F2]/10 via-[#0d1226] to-[#070b16] border border-[#5865F2]/30 space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#5865F2] uppercase font-semibold flex items-center gap-1.5">
                  <DiscordIcon className="w-4 h-4 text-[#5865F2]" /> Discord Direct
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#828cf5]">
                  Click to Copy
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold font-mono text-white">
                  {discordUsername}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Kirim pesan atau request friend untuk diskusi santai seputar programming.
                </p>
              </div>

              <button
                onClick={handleCopyDiscord}
                className="w-full py-2.5 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(88,101,242,0.3)]"
              >
                {copiedDiscord ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Username Disalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Username Discord</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Grid */}
            <div className="space-y-3">
              {socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-4 rounded-2xl bg-[#090e1e] border border-slate-800 flex items-center justify-between transition-all hover:-translate-x-1 ${soc.color} group`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:scale-110 transition-transform">
                      {soc.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-inherit">
                        {soc.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-400">
                        {soc.handle}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            {/* Location Badge */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-center gap-3 text-xs font-mono text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Cibinong, Kab. Bogor, Jawa Barat, Indonesia</span>
            </div>

          </div>

          {/* Right Form: Quick Message (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080d1e] border border-slate-800 shadow-xl relative">
              <div className="flex items-center gap-2 mb-6 font-mono text-xs text-slate-400 pb-4 border-b border-slate-800">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>send_packet.sh --interactive-message</span>
              </div>

              {sentSuccess ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-2xl">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-white font-mono">
                    Pesan Berhasil Terkirim!
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-mono">
                    Terima kasih atas pesannya! Rafid akan segera membaca pesan kamu.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                      Nama Kamu / Alias
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[#050813] border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                      Email / Kontak (Opsional)
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. contact@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#050813] border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                      Pesan / Diskusi Proyek
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hai Rafid, saya tertarik untuk mendiskusikan..."
                      className="w-full px-4 py-3 rounded-xl bg-[#050813] border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 text-xs sm:text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
