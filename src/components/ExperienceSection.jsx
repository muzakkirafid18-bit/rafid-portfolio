import { GraduationCap, Briefcase, FolderGit2, Award, Trophy, Sparkles } from 'lucide-react';

export default function ExperienceSection() {
  const educations = [
    {
      school: 'SMKN 1 Cibinong',
      major: 'Pengembangan Perangkat Lunak dan Gim (PPLG / RPL)',
      period: '2024 – Sekarang',
      badge: 'Active Student',
      logo: '🎓',
      desc: 'Fokus pada Backend Programming (PHP Native & Laravel), Relational Database (MySQL & PostgreSQL), dan Desktop Programming (C#).',
    },
    {
      school: 'SMPN 4 Cibinong',
      major: 'Sekolah Menengah Pertama',
      period: '2021 – 2024',
      badge: 'Lulus',
      logo: '📘',
      desc: 'Membangun dasar logika komputasi, algoritma pemrograman awal, dan ketertarikan pada rekayasa web.',
    },
    {
      school: 'SDN Pabuaran 07',
      major: 'Sekolah Dasar',
      period: '2015 – 2021',
      badge: 'Lulus',
      logo: '🏫',
      desc: 'Pendidikan dasar akademik di Cibinong, Kabupaten Bogor.',
    },
  ];

  const experiences = [
    {
      role: 'Backend Programmer',
      org: 'Proyek LSP SMKN 1 Cibinong (Validasi Neo One Academy)',
      period: '2026',
      badge: 'Industry Validated',
      logo: '🏆',
      desc: 'Merancang struktur basis data 54 tabel MySQL (lsp_p1_db), mengimplementasikan formulir standar BNSP (APL-01, APL-02, MAK Series) menggunakan PHP Native & PDO.',
    },
  ];

  const stats = [
    {
      value: '3+',
      label: 'Projects',
      sub: 'Karya yang dibuat',
      icon: <FolderGit2 className="w-5 h-5 text-blue-400" />,
      glow: 'from-blue-500/20 to-indigo-500/10',
    },
    {
      value: '3',
      label: 'Certificates',
      sub: 'Skill yang divalidasi',
      icon: <Award className="w-5 h-5 text-indigo-400" />,
      glow: 'from-indigo-500/20 to-purple-500/10',
    },
    {
      value: '1',
      label: 'Industry Validation',
      sub: '+ Target 2x BNSP',
      icon: <Trophy className="w-5 h-5 text-purple-400" />,
      glow: 'from-purple-500/20 to-blue-500/10',
    },
  ];

  return (
    <section className="py-20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Education & Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Education (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400">
                  Academic Background
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  Education
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {educations.map((edu, idx) => (
                <div key={idx} className="cosmic-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/20 flex items-center justify-center text-2xl shrink-0">
                    {edu.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-base sm:text-lg font-bold text-white">
                        {edu.school}
                      </h4>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-mono text-indigo-300 mt-0.5">
                      {edu.major}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {edu.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
                  Practical Journey
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  Experience
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="cosmic-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/25 flex items-center justify-center text-2xl shrink-0">
                    {exp.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-base sm:text-lg font-bold text-white">
                        {exp.role}
                      </h4>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-blue-300 mt-1">
                      {exp.org}
                    </p>
                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Open for Internship Card */}
              <div className="p-5 rounded-2xl border border-dashed border-blue-400/30 bg-blue-950/15 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Open for Internship / PKL & Collab</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Siap berkontribusi sebagai Backend Developer Intern (Laravel, PHP, MySQL/PostgreSQL) serta menempuh 2 skema uji kompetensi nasional BNSP bulan ini.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Portfolio Statistics (3 Prismatic Metric Cards) */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Portfolio Statistics
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className={`cosmic-card rounded-3xl p-6 bg-gradient-to-br ${st.glow} relative overflow-hidden group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {st.icon}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Verified
                  </span>
                </div>
                <div className="font-display text-4xl font-bold text-white">
                  {st.value}
                </div>
                <div className="text-sm font-semibold text-blue-200 mt-1">
                  {st.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 font-mono">
                  {st.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
