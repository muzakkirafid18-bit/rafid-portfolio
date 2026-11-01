import { useState } from 'react';
import { GraduationCap, Award, Calendar, CheckCircle2, Clock, Sparkles, ExternalLink, Image as ImageIcon, FileText, Check } from 'lucide-react';

export default function EducationTimeline() {
  const [selectedCert, setSelectedCert] = useState(null);

  const educationList = [
    {
      school: 'SMKN 1 Cibinong',
      degree: 'Pengembangan Perangkat Lunak dan Gim (PPLG / RPL)',
      period: 'Sedang Berjalan (Current)',
      status: 'Active Student',
      highlights: 'Fokus pada kurikulum Backend Programming (PHP/Laravel), Basis Data (MySQL/PostgreSQL), Desktop Programming (C#), dan Web Design.',
      active: true,
    },
    {
      school: 'SMPN 4 Cibinong',
      degree: 'Sekolah Menengah Pertama',
      period: 'Lulus',
      status: 'Completed',
      highlights: 'Mulai mendalami logika komputasi, algoritma dasar, dan ketertarikan di dunia teknologi informasi.',
      active: false,
    },
    {
      school: 'SDN Pabuaran 07',
      degree: 'Sekolah Dasar',
      period: 'Lulus',
      status: 'Completed',
      highlights: 'Fondasi awal pendidikan dasar dan keaktifan akademik di Cibinong.',
      active: false,
    },
  ];

  const certificates = [
    {
      id: 'neoone-lsp',
      title: 'Neo One Industry Validation: Backend Programmer',
      issuer: 'Neo One Academy (Validasi Industri)',
      status: 'Validasi Industri',
      type: 'Professional Recognition Certificate',
      date: '22 Mei 2026',
      credentialId: '132111052026026',
      image: '/sertifikat-lsp-neoone.jpg',
      verifyUrl: null,
      pdfUrl: null,
      desc: 'Pengakuan industri atas kontribusi profesional dalam alur kerja simulasi pengembangan sistem LSP SMKN 1 Cibinong sebagai Backend Programmer.',
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
      icon: '🏆',
    },
    {
      id: 'dicoding-dart',
      title: 'Memulai Pemrograman dengan Dart',
      issuer: 'Dicoding Indonesia & Google Developers',
      status: 'Kelulusan Kelas & Tugas',
      type: 'Course Completion & Competence',
      date: '28 Agustus 2026',
      credentialId: 'L4PQW30L2PO1',
      image: null,
      verifyUrl: 'https://www.dicoding.com/certificates/L4PQW30L2PO1',
      pdfUrl: '/sertifikat-dicoding-dart.pdf',
      desc: 'Sertifikat kelulusan materi dan tugas submission pemrograman bahasa Dart (OOP, Collections, Type System, Futures & Asinkron). Total 30 jam belajar.',
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
      icon: '🎯',
    },
    {
      id: 'dicoding-flutter',
      title: 'Belajar Membuat Aplikasi Flutter untuk Pemula',
      issuer: 'Dicoding Indonesia & Google Developers',
      status: 'Kelulusan Kelas & Tugas',
      type: 'Course Completion & Competence',
      date: '29 Agustus 2026',
      credentialId: 'ERZR7M50QZYV',
      image: null,
      verifyUrl: 'https://www.dicoding.com/certificates/ERZR7M50QZYV',
      pdfUrl: '/sertifikat-dicoding-flutter.pdf',
      desc: 'Sertifikat kelulusan materi dan submission proyek akhir pembuatan aplikasi Flutter (Widget Layout, Navigation, State Management, Build APK/Web). Total 40 jam belajar.',
      badgeColor: 'border-sky-500/40 text-sky-400 bg-sky-950/40',
      icon: '📱',
    },
    {
      id: 'bnsp-target',
      title: 'Target 2x Sertifikasi BNSP',
      issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      status: 'Target Bulan Ini',
      type: 'National Professional Competency',
      date: 'Target: Bulan Ini',
      credentialId: 'Persiapan Ujian',
      image: null,
      verifyUrl: null,
      pdfUrl: null,
      desc: 'Persiapan intensif untuk menempuh 2 skema uji kompetensi nasional standarisasi keahlian profesi rekayasa perangkat lunak.',
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-950/40',
      icon: '🚀',
    },
  ];

  return (
    <section id="education" className="py-20 relative bg-[#060913]/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 font-mono text-emerald-400 text-xs sm:text-sm tracking-wide">
            <span>04. LEARNING JOURNEY</span>
            <div className="h-[1px] w-12 bg-emerald-500/40"></div>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
            Pendidikan & Sertifikasi
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Jejak langkah akademik, kelulusan kelas pelatihan industri, dan validasi kompetensi profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Education Timeline (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span>Jalur Akademik</span>
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-emerald-400 before:via-cyan-500/40 before:to-slate-800">
              {educationList.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Pin Dot */}
                  <div
                    className={`absolute -left-[29px] sm:-left-[37px] top-1.5 w-4 h-4 rounded-full border-2 ${
                      edu.active
                        ? 'border-emerald-400 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]'
                        : 'border-slate-700 bg-slate-900'
                    }`}
                  ></div>

                  <div className="p-5 rounded-2xl bg-[#090d1c] border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        {edu.period}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          edu.active
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {edu.school}
                    </h4>
                    <p className="text-xs sm:text-sm font-mono text-cyan-400 mt-0.5">
                      {edu.degree}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                      {edu.highlights}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Certifications (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Sertifikasi & Validasi Industri</span>
            </h3>

            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-[#090d1c] border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                        {cert.icon}
                      </span>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {cert.issuer} • <span className="font-mono text-slate-500">{cert.date}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cert.desc}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${cert.badgeColor}`}>
                      {cert.status}
                    </span>

                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="text-xs font-mono text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors"
                    >
                      {cert.image ? <ImageIcon className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5 text-cyan-400" />}
                      <span>Lihat Detail</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note badge */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300/90 font-mono flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Sertifikat Dicoding mencerminkan penyelesaian kurikulum & tugas submission berstandar industri. Sedang mempersiapkan 2x sertifikasi BNSP bulan ini.
              </span>
            </div>
          </div>

        </div>

        {/* Certificate Preview Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div className="w-full max-w-2xl bg-[#0a0f21] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    {selectedCert.type}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Penerbit: {selectedCert.issuer}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Certificate Image if available */}
              {selectedCert.image ? (
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-950 border border-slate-800 text-center space-y-3">
                  <Award className="w-12 h-12 text-cyan-400 mx-auto" />
                  <div>
                    <h4 className="text-base font-bold text-white font-mono">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      No. Kredensial: {selectedCert.credentialId}
                    </p>
                  </div>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    {selectedCert.desc}
                  </p>
                </div>
              )}

              {/* Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-500">
                  ID: <span className="text-slate-400">{selectedCert.credentialId}</span>
                </div>

                <div className="flex items-center gap-2">
                  {selectedCert.verifyUrl && (
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verifikasi Dicoding</span>
                    </a>
                  )}

                  {selectedCert.pdfUrl && (
                    <a
                      href={selectedCert.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Buka Dokumen PDF</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
