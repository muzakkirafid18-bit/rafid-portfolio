import { useState } from 'react';
import { ExternalLink, FolderGit2, Star, Code2, Layers, Monitor, Gamepad2, Globe } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 'lsp',
      title: 'Aplikasi LSP SMKN 1 Cibinong',
      subtitle: 'Sistem Informasi Lembaga Sertifikasi Profesi Berbasis Web',
      category: 'Web Application',
      featured: true,
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      bannerGradient: 'from-emerald-900/40 via-slate-900 to-[#070b16]',
      coverImage: '/lsp-screenshot.png',
      tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Blade'],
      github: 'https://github.com/muzakkirafid18-bit/LSP_Tes',
      demo: null,
      description:
        'Aplikasi manajemen uji sertifikasi profesi untuk SMKN 1 Cibinong. Membantu digitalisasi pendataan calon asesi, pemilihan skema kompetensi keahlian, pengelolaan data asesor, dan rekapitulasi nilai hasil asesmen secara terstruktur.',
      keyFeatures: [
        'Multi-Role Authentication (Admin, Asesor, Asesi/Siswa)',
        'Manajemen skema sertifikasi dan jadwal uji kompetensi',
        'Relasi database MySQL terstruktur menggunakan Eloquent ORM',
        'UI responsif dan modern dengan Tailwind CSS',
      ],
      codeSnippet: `// Contoh Controller Skema Asesi
public function registerAsesi(Request $request) {
    $validated = $request->validate([
        'nisn' => 'required|unique:asesi,nisn',
        'skema_id' => 'required|exists:skemas,id',
    ]);
    return Asesi::create($validated);
}`,
    },
    {
      id: 'advenland',
      title: 'Game Advenland',
      subtitle: 'Interactive Adventure & Logic Game',
      category: 'Game Project',
      featured: false,
      icon: <Gamepad2 className="w-5 h-5 text-cyan-400" />,
      bannerGradient: 'from-cyan-900/40 via-slate-900 to-[#070b16]',
      coverImage: null,
      tech: ['Game Logic', 'State Management', 'Interactive Systems'],
      github: 'https://github.com/muzakkirafid18-bit',
      demo: null,
      description:
        'Game bertema petualangan dengan eksplorasi dunia interaktif, mekanik teka-teki logika, dan manajemen progression pemain. Mengasah pemahaman computational thinking dan penanganan state game.',
      keyFeatures: [
        'Mekanik petualangan dan interaksi rintangan',
        'State tracking untuk poin dan kesehatan karakter',
        'Desain alur level yang menantang dan adaptif',
      ],
      codeSnippet: `// Game Player Loop & State Controller
function handlePlayerAction(action) {
    if (player.stamina <= 0) return 'Tired';
    updateGameState(action.type, action.payload);
}`,
    },
    {
      id: 'donasi',
      title: 'Aplikasi Donasi Desktop C#',
      subtitle: 'Sistem Informasi Pengelolaan & Rekapitulasi Donasi',
      category: 'Desktop Software',
      featured: false,
      icon: <Monitor className="w-5 h-5 text-purple-400" />,
      bannerGradient: 'from-purple-900/40 via-slate-900 to-[#070b16]',
      coverImage: null,
      tech: ['C#', '.NET Framework', 'Desktop UI', 'Local Database'],
      github: 'https://github.com/muzakkirafid18-bit',
      demo: null,
      description:
        'Aplikasi standalone berbasis desktop yang dibangun menggunakan C# untuk mencatat transaksi donasi, pendataan nama donatur, kategori program amal, serta pembuatan laporan rekapitulasi dana secara otomatis.',
      keyFeatures: [
        'Antarmuka desktop user-friendly untuk input donasi',
        'Kalkulasi otomatis jumlah dana masuk per kategori',
        'Penyimpanan database lokal yang aman dan reliable',
        'Cetak & rekap laporan keuangan donasi',
      ],
      codeSnippet: `// C# Data Transaction Handler
public void SubmitDonation(Donatur model) {
    using (var conn = new SqlConnection(connectionString)) {
        conn.Execute("INSERT INTO Donasi ...", model);
    }
}`,
    },
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 font-mono text-emerald-400 text-xs sm:text-sm tracking-wide">
            <span>03. SELECTED WORKS</span>
            <div className="h-[1px] w-12 bg-emerald-500/40"></div>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
            Proyek Unggulan
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Koleksi proyek nyata yang saya bangun untuk mengimplementasikan solusi backend, aplikasi web, dan software desktop.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-[#070b16] border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            >
              {/* Top Banner */}
              <div className={`relative bg-gradient-to-br ${item.bannerGradient} border-b border-slate-800/80 overflow-hidden`}>
                {item.featured && (
                  <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-semibold flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-emerald-400" /> Featured Web
                  </span>
                )}

                {/* Cover Image or Code Snippet */}
                {item.coverImage ? (
                  <div className="relative">
                    <img
                      src={item.coverImage}
                      alt={`Screenshot ${item.title}`}
                      className="w-full h-48 sm:h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-transparent opacity-60"></div>
                    {/* Title overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 backdrop-blur-sm">
                          {item.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-emerald-400/80 tracking-wider">
                            {item.category}
                          </span>
                          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Code preview snippet */}
                    <div className="mt-4 rounded-xl bg-slate-950/80 p-3 border border-slate-800/80 font-mono text-[11px] text-slate-400 overflow-x-auto select-none opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-900 text-slate-500 text-[10px]">
                        <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                        <span>source_preview.code</span>
                      </div>
                      <pre className="text-emerald-300/80 leading-relaxed overflow-x-hidden">
                        {item.codeSnippet.split('\n').slice(0, 4).join('\n')}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 space-y-1.5">
                    {item.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-400 text-xs">
                        <span className="text-emerald-400 font-mono font-bold">›</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badges & Actions */}
                <div className="pt-4 border-t border-slate-800/80 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-slate-700 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold group/link"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Lihat di GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>

                    <button
                      onClick={() => setActiveProject(item)}
                      className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800/40 hover:bg-slate-800 transition-colors"
                    >
                      Detail Specs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Specs */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-2xl bg-[#090e1d] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase">
                    {activeProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 font-mono">
                    {activeProject.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Cover image in modal if available */}
              {activeProject.coverImage && (
                <div className="rounded-xl overflow-hidden border border-slate-800">
                  <img
                    src={activeProject.coverImage}
                    alt={`Screenshot ${activeProject.title}`}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400">Deskripsi Lengkap</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400">Fitur & Implementasi Kunci</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.keyFeatures.map((feat, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Arsitektur Kode</h4>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                  {activeProject.codeSnippet}
                </pre>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs font-mono flex items-center gap-2 hover:bg-emerald-400"
                >
                  <GithubIcon className="w-4 h-4" /> Buka Repository
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
