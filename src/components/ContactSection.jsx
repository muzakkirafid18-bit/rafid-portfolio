import { useState, useEffect } from 'react';
import {
  Send,
  Mail,
  Copy,
  Check,
  MessageSquare,
  ImagePlus,
  Sparkles,
  ChevronDown,
  User,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, DiscordIcon } from './Icons';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const STORAGE_KEY = 'rafid_portfolio_comments_v1';

const STARTER_COMMENTS = [
  {
    id: 'c-1',
    name: 'Shaka Aufa',
    message: 'Kontribusi backend di proyek LSP SMKN 1 Cibinong sangat solid! Skema databasenya rapi.',
    avatar_url: null,
    created_at: '2026-10-20T09:30:00.000Z',
  },
  {
    id: 'c-2',
    name: 'Rizky Pratama',
    message: 'Keren banget 3D Lanyard dan REST API Playground-nya, jarang ada anak SMK bikin portofolio sedetail ini 🔥',
    avatar_url: null,
    created_at: '2026-11-05T14:15:00.000Z',
  },
  {
    id: 'c-3',
    name: 'Nadia Putri',
    message: 'Sukses buat uji kompetensi BNSP bulan ini, Rafid!',
    avatar_url: null,
    created_at: '2026-11-12T18:40:00.000Z',
  },
];

function formatRelativeTime(isoString) {
  try {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Baru saja';
    if (mins < 60) return `${mins} menit lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} hari lalu`;
    return new Date(isoString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Baru saja';
  }
}

export default function ContactSection() {
  const myEmail = 'muzakkirafid18@gmail.com';
  const discordUsername = 'rafid_muzakki_40241';

  // Left card: Contact form
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  // Right card: Live comments wall
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [commentForm, setCommentForm] = useState({ name: '', message: '' });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarError, setAvatarError] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error && data) {
            setComments(data);
            return;
          }
        } catch {
          // Fallback to localStorage if table doesn't exist yet
        }
      }

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setComments(JSON.parse(saved));
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(STARTER_COMMENTS));
          setComments(STARTER_COMMENTS);
        }
      } catch {
        setComments(STARTER_COMMENTS);
      }
    };

    loadComments();
  }, []);

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(discordUsername);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;

    const subject = `[Portofolio Collab] Pesan dari ${formState.name}`;
    const body = `Halo Rafid,\n\nNama: ${formState.name}\nEmail: ${formState.email || 'Tidak dicantumkan'}\n\nPesan:\n${formState.message}\n\n---\nDikirim via rafid-dev-portfolio`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(myEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const win = window.open(gmailUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = mailtoUrl;
    }

    setSentSuccess(true);
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#3b82f6', '#6366f1', '#a855f7'],
    });
  };

  const handleAvatarChange = (e) => {
    setAvatarError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError('Ukuran foto maksimal 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.message.trim()) return;
    setIsPostingComment(true);

    const newComment = {
      id: `c-${Date.now()}`,
      name: commentForm.name.trim(),
      message: commentForm.message.trim(),
      avatar_url: avatarPreview || null,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .insert([
            {
              name: newComment.name,
              message: newComment.message,
              avatar_url: newComment.avatar_url,
            },
          ])
          .select();

        if (!error && data && data[0]) {
          setComments((prev) => [data[0], ...prev]);
          setCommentForm({ name: '', message: '' });
          setAvatarPreview(null);
          setIsPostingComment(false);
          return;
        }
      } catch {
        // Fallback to localStorage
      }
    }

    const updated = [newComment, ...comments];
    setComments(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota errors on large images
    }
    setCommentForm({ name: '', message: '' });
    setAvatarPreview(null);
    setIsPostingComment(false);
  };

  return (
    <section id="Contact" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">
            Hubungi{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Saya
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Ada ide proyek, peluang magang / PKL, atau sekadar ingin meninggalkan jejak di kolom komentar? Silakan!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Card: Hubungi Saya (Direct Gmail + FIND ME) */}
          <div className="lg:col-span-5 cosmic-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Kirim Pesan</h3>
                  <p className="text-[11px] font-mono text-slate-400">{myEmail}</p>
                </div>
              </div>
            </div>

            {sentSuccess ? (
              <div className="py-8 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 mx-auto flex items-center justify-center text-xl">
                  ✓
                </div>
                <h4 className="font-display text-lg font-bold text-white">Gmail Terbuka!</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Silakan klik <strong>Send / Kirim</strong> pada jendela Gmail yang baru terbuka.
                </p>
                <button
                  onClick={() => {
                    setSentSuccess(false);
                    setFormState({ name: '', email: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Nama</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Nama kamu / instansi"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#040612] border border-white/10 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-400/60 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#040612] border border-white/10 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-400/60 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Pesan</label>
                  <textarea
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tulis pesan untuk Rafid..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#040612] border border-white/10 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-400/60 text-xs sm:text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan via Gmail</span>
                </button>
              </form>
            )}

            {/* FIND ME */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block">
                Find Me
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="https://github.com/muzakkirafid18-bit"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span className="truncate">@muzakkirafid18-bit</span>
                </a>
                <a
                  href="https://www.instagram.com/812.raf/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 text-xs text-slate-300 hover:text-pink-300 transition-all"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span className="truncate">@812.raf</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/rafid-muzakki-1069733a8/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 text-xs text-slate-300 hover:text-blue-300 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span className="truncate">Rafid Muzakki</span>
                </a>
                <button
                  onClick={handleCopyDiscord}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs text-slate-300 hover:text-indigo-300 transition-all"
                  title="Salin username Discord"
                >
                  <span className="flex items-center gap-2 truncate">
                    <DiscordIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="truncate">{copiedDiscord ? 'Disalin!' : 'Discord'}</span>
                  </span>
                  {copiedDiscord ? <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Card: Live Comments Wall (Supabase-ready + Fallback) */}
          <div className="lg:col-span-7 cosmic-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Komentar <span className="text-blue-400 font-mono text-sm">({comments.length})</span>
                </h3>
              </div>

              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-blue-400" />
                {isSupabaseConfigured ? 'Supabase Live' : 'Local / Supabase Ready'}
              </span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3 bg-[#040612] p-4 rounded-2xl border border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={commentForm.name}
                  onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                  placeholder="Nama kamu *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-400/60 text-xs sm:text-sm"
                />

                <label className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-blue-400/50 cursor-pointer text-xs text-slate-300 transition-colors">
                  <span className="flex items-center gap-2 truncate">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <ImagePlus className="w-4 h-4 text-blue-400 shrink-0" />
                    )}
                    <span className="truncate">
                      {avatarPreview ? 'Foto dipilih' : 'Foto Profil (opsional, maks 5MB)'}
                    </span>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              {avatarError && <p className="text-xs text-rose-400 font-mono">{avatarError}</p>}

              <textarea
                required
                rows={2}
                value={commentForm.message}
                onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                placeholder="Tulis komentar atau masukan untuk portofolio ini..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-400/60 text-xs sm:text-sm resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPostingComment}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isPostingComment ? 'Mengirim...' : 'Kirim Komentar'}</span>
                </button>
              </div>
            </form>

            {/* Scrollable Comment List */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {comments.slice(0, visibleCount).map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5"
                >
                  {c.avatar_url ? (
                    <img
                      src={c.avatar_url}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover border border-blue-400/40 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{c.name}</h4>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {formatRelativeTime(c.created_at)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed break-words">
                      {c.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < comments.length && (
              <div className="text-center pt-1">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  <span>Lihat komentar lainnya</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
