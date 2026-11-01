import { useState } from 'react';
import { MessageSquare, Copy, Check, Send, MapPin, Sparkles, Terminal, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, DiscordIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const discordUsername = 'rafid_muzakki_40241';
  const myEmail = 'muzakkirafid18@gmail.com';

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopiedEmail(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#ea4335', '#10b981', '#ffffff'],
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;

    const subject = `[Portofolio Collab] Pesan dari ${formState.name}`;
    const body = `Halo Rafid,\n\nNama: ${formState.name}\nEmail / Kontak: ${formState.email || 'Tidak dicantumkan'}\n\nPesan:\n${formState.message}\n\n---\nDikirim via rafid-dev-portfolio`;

    // Prioritize Web Gmail direct compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(myEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open compose window
    const newWindow = window.open(gmailUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = mailtoUrl;
    }

    setSentSuccess(true);
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#ea4335'],
    });
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
            <span>// 06. INITIATE PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mari Terhubung & Kolaborasi
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Punya ide proyek, diskusi seputar backend development, peluang magang, atau ingin berkenalan? Pintu komunikasi selalu terbuka!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Cards: Email & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Email Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 via-[#0d1226] to-[#070b16] border border-rose-500/30 space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-rose-400 uppercase font-semibold flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-rose-400" /> Direct Gmail
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  Primary Inbox
                </span>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold font-mono text-white truncate">
                  {myEmail}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Kontak resmi untuk tawaran magang / PKL, freelance, atau kolaborasi proyek backend.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`mailto:${myEmail}?subject=${encodeURIComponent('[Portofolio Collab] Diskusi Proyek')}`}
                  className="py-2.5 px-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kirim Email</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Disalin!' : 'Salin Email'}</span>
                </button>
              </div>
            </div>

            {/* Discord Special Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#5865F2]/10 via-[#0d1226] to-[#070b16] border border-[#5865F2]/30 space-y-2 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#5865F2] uppercase font-semibold flex items-center gap-1.5">
                  <DiscordIcon className="w-4 h-4 text-[#5865F2]" /> Discord Direct
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#828cf5]">
                  Chat
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <h4 className="text-sm font-bold font-mono text-white">
                  {discordUsername}
                </h4>
                <button
                  onClick={handleCopyDiscord}
                  className="py-1 px-3 rounded-lg bg-[#5865F2]/80 hover:bg-[#5865F2] text-white font-mono text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  {copiedDiscord ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDiscord ? 'Disalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            {/* Social Grid */}
            <div className="space-y-2.5">
              {socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3.5 rounded-2xl bg-[#090e1e] border border-slate-800 flex items-center justify-between transition-all hover:-translate-x-1 ${soc.color} group`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:scale-110 transition-transform">
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

          {/* Right Form: Quick Message via Gmail (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#090e21] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative">
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Terminal className="w-4 h-4" />
                  <span>Kirim Pesan Langsung ke Gmail</span>
                </span>
                <span className="text-slate-500">to: {myEmail}</span>
              </div>

              {sentSuccess ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-white font-mono">
                    Gmail Kamu Berhasil Terbuka!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto font-sans leading-relaxed">
                    Pesan dan subjek sudah otomatis terisi di jendela Gmail. Silakan klik <strong>"Kirim / Send"</strong> di email kamu untuk menyelesaikan pengiriman.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setSentSuccess(false);
                        setFormState({ name: '', email: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-sans">
                      Nama Lengkap / Instansi
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Budi Santoso / PT Tech Indonesia"
                      className="w-full px-4 py-3 rounded-xl bg-[#050813] border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 text-xs sm:text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-sans">
                      Email Pengirim (untuk balasan)
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. budi@perusahaan.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#050813] border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 text-xs sm:text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-sans">
                      Pesan / Topik Diskusi Proyek
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Halo Rafid, kami ingin mendiskusikan peluang magang / proyek backend pembuatan REST API..."
                      className="w-full px-4 py-3 rounded-xl bg-[#050813] border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 text-xs sm:text-sm font-sans resize-none"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 font-sans">
                    💡 Saat tombol diklik, aplikasi Gmail / mail client kamu akan langsung terbuka dengan isi pesan yang sudah diformat rapi ke <span className="text-slate-400 font-mono">{myEmail}</span>.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Lanjutkan Kirim via Gmail</span>
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
