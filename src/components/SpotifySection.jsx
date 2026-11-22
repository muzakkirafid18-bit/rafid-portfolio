import { Music2, ExternalLink } from 'lucide-react';

export default function SpotifySection() {
  // Default coding lo-fi playlist; user can replace with their personal Spotify playlist ID anytime
  const spotifyPlaylistUrl = 'https://open.spotify.com/playlist/37i9dQZF1DX5trt9iNuBsX';
  const spotifyEmbedUrl = 'https://open.spotify.com/embed/playlist/37i9dQZF1DX5trt9iNuBsX?utm_source=generator&theme=0';

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

              <a
                href={spotifyPlaylistUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-blue-300 hover:text-white transition-colors pt-1"
              >
                <span>Daily Rotation di Spotify</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right Spotify Embed */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080b18] shadow-xl">
                <iframe
                  title="Spotify Daily Rotation Playlist"
                  src={spotifyEmbedUrl}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="w-full"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
