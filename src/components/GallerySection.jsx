import { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function GallerySection() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const photos = [
    {
      src: '/gallery-1.jpg',
      title: 'Suit Up • Event Day',
      tag: 'Formal',
      caption: 'Persiapan presentasi dan momen kegiatan resmi bersama teman-teman.',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      src: '/gallery-2.jpg',
      title: 'After Hours',
      tag: 'Candid',
      caption: 'Menyesuaikan jas setelah acara malam hari.',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      src: '/about-rafid.jpg',
      title: 'Quiet Moments',
      tag: 'Personal',
      caption: 'Sejenak rehat di luar layar dan baris kode.',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      src: '/gallery-3.jpg',
      title: 'Night Coffee & Ideas',
      tag: 'Hangout',
      caption: 'Mencari inspirasi ide proyek baru sambil nongkrong malam.',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      src: '/gallery-4.jpg',
      title: 'Late Night Recharge',
      tag: 'Chill',
      caption: 'Mengisi energi setelah sesi ngoding panjang.',
      span: 'md:col-span-1 md:row-span-1',
    },
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="Gallery" className="py-20 sm:py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-mono mb-3">
            <Camera className="w-3.5 h-3.5 text-blue-400" />
            <span>Behind The Code</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">
            Moments &{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Potret singkat perjalanan, kegiatan, dan momen santai di luar layar terminal.
          </p>
        </div>

        {/* Cosmic Bento Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[240px] sm:auto-rows-[260px] gap-4">
          {photos.map((photo, idx) => (
            <div
              key={photo.src}
              onClick={() => setSelectedIdx(idx)}
              className={`group relative rounded-3xl overflow-hidden cosmic-card cursor-pointer ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dark Cosmic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/90 via-[#050510]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Top Tag + Expand Icon */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-black/50 border border-white/15 backdrop-blur-md text-[10px] font-mono text-blue-300 uppercase tracking-wider">
                  {photo.tag}
                </span>
                <span className="p-2 rounded-full bg-black/50 border border-white/15 backdrop-blur-md text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-base sm:text-lg font-bold text-white leading-tight">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-300/90 mt-1 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Fullscreen Modal */}
        {selectedIdx !== null && (
          <div
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          >
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Tutup galeri"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full flex flex-col items-center space-y-4"
            >
              <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl max-h-[75vh] bg-[#050510]">
                <img
                  src={photos[selectedIdx].src}
                  alt={photos[selectedIdx].title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
              <div className="text-center space-y-1">
                <h4 className="font-display text-lg font-bold text-white">
                  {photos[selectedIdx].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  {photos[selectedIdx].caption}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
