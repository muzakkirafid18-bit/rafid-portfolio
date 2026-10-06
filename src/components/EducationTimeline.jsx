import { useState } from 'react';
import { GraduationCap, Award, Calendar, CheckCircle2, Clock, Sparkles, ExternalLink, Image as ImageIcon } from 'lucide-react';

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
      id: 'dicoding',
      title: 'Dicoding Academy Certificate',
      issuer: 'Dicoding Indonesia',
      status: 'Verified',
      type: 'Certificate of Competence',
      date: 'Terverifikasi',
      desc: 'Pelatihan dasar pengembangan software & web development dengan kurikulum industri berstandar global.',
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
      icon: '🏆',
    },
    {
      id: 'bnsp-1',
      title: 'Sertifikasi BNSP #1',
      issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      status: 'Upcoming Exam (Bulan Ini)',
      type: 'National Professional Competency',
      date: 'Bulan Ini',
      desc: 'Uji kompetensi nasional untuk standarisasi keahlian pemrograman dan rekayasa perangkat lunak.',
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-950/40',
      icon: '🎯',
    },
    {
      id: 'bnsp-2',
      title: 'Sertifikasi BNSP #2',
      issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      status: 'Upcoming Exam (Bulan Ini)',
      type: 'National Professional Competency',
      date: 'Bulan Ini',
      desc: 'Uji sertifikasi keahlian teknis kedua untuk pengakuan kompetensi industri skala nasional.',
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
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
            Jejak langkah akademik dan sertifikasi kompetensi untuk mengasah standar keahlian di dunia IT.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Education Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
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

          {/* Right: Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Sertifikasi & Lisensi</span>
            </h3>

            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-[#090d1c] border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                        {cert.icon}
                      </span>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {cert.issuer}
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
                      className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Lihat Preview</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note badge */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300/90 font-mono flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Sedang mempersiapkan diri secara intensif untuk kelulusan 2 ujian skema sertifikasi BNSP di bulan ini.
              </span>
            </div>
          </div>

        </div>

        {/* Certificate Preview Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-lg bg-[#0a0f21] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase">
                    Preview Dokumen Sertifikasi
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {selectedCert.issuer}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Certificate Placeholder visual */}
              <div className="h-48 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-950 border border-slate-700/80 flex flex-col items-center justify-center p-6 text-center space-y-2 relative overflow-hidden">
                <Award className="w-12 h-12 text-cyan-400 mb-1" />
                <h4 className="font-mono text-sm font-bold text-white">
                  {selectedCert.title}
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  Status: {selectedCert.status}
                </p>
                <div className="text-[10px] text-slate-500 font-mono">
                  [Foto Sertifikat Asli Dapat Di-upload ke folder /public/]
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
                >
                  Tutup Preview
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
