import { Music2, ExternalLink } from 'lucide-react';

export default function SpotifySection() {
  const playlists = [
    {
      id: '3tTGV6mi4KfK4wXLnF0x4G',
      label: 'Daily Rotation #1',
      url: 'https://open.spotify.com/playlist/3tTGV6mi4KfK4wXLnF0x4G?si=8V2jQQyXSRavm6O12GxsWA',
      embedUrl: 'https://open.spotify.com/embed/playlist/3tTGV6mi4KfK4wXLnF0x4G?utm_source=generator&theme=0',
    },
    {
      id: '2wb5F60fx2s7so7RMd1iJe',
      label: 'Daily Rotation #2',
      url: 'https://open.spotify.com/playlist/2wb5F60fx2s7so7RMd1iJe?si=SNrn4K0hQhOhWw54DsZC-A',
      embedUrl: 'https://open.spotify.com/embed/playlist/2wb5F60fx2s7so7RMd1iJe?utm_source=generator&theme=0',
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cosmic-card rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-mono">
                <Music2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Coding Soundtrack</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                A little music.{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                  A lot of ideas.
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Musik selalu jadi teman setia waktu merancang skema database, debugging query PHP, atau nulis REST API sampai larut malam.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {playlists.map((pl) => (
                  <a
                    key={pl.id}
                    href={pl.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-300 hover:text-white transition-colors"
                  >
                    <span>{pl.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right All 3 Spotify Embeds */}
            <div className="lg:col-span-7 space-y-3">
              {playlists.map((pl) => (
                <div key={pl.id} className="rounded-2xl overflow-hidden border border-white/10 bg-[#080b18] shadow-xl">
                  <iframe
                    title={`Spotify ${pl.label}`}
                    src={pl.embedUrl}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full"
                  ></iframe>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
