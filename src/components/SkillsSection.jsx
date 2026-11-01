import { useState } from 'react';
import { Database, Server, Code, Cpu, Layers, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: '// All Stack' },
    { id: 'backend', label: '// Backend & DB' },
    { id: 'frontend', label: '// Web & Styling' },
    { id: 'other', label: '// Desktop & Tools' },
  ];

  const skills = [
    {
      name: 'PHP',
      category: 'backend',
      icon: '🐘',
      badge: 'Core Language',
      desc: 'Server-side scripting, OOP, RESTful endpoints, dan backend logic.',
      color: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-500/30',
      text: 'text-indigo-400',
    },
    {
      name: 'Laravel',
      category: 'backend',
      icon: '🔴',
      badge: 'Primary Framework',
      desc: 'Routing, Controller, Eloquent ORM, Blade templating, & Auth management.',
      color: 'from-rose-500/20 to-red-500/20',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
    },
    {
      name: 'MySQL',
      category: 'backend',
      icon: '🐬',
      badge: 'Relational DB',
      desc: 'Database schema design, query optimization, join table, dan migrasi Laravel.',
      color: 'from-sky-500/20 to-blue-500/20',
      border: 'border-sky-500/30',
      text: 'text-sky-400',
    },
    {
      name: 'PostgreSQL',
      category: 'backend',
      icon: '🐘',
      badge: 'Advanced SQL',
      desc: 'Relational database handal untuk integritas data kompleks & relasi tabel.',
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      icon: '🌊',
      badge: 'Modern Styling',
      desc: 'Utility-first CSS untuk membangun UI responsive, rapi, dan cepat.',
      color: 'from-teal-500/20 to-emerald-500/20',
      border: 'border-teal-500/30',
      text: 'text-teal-400',
    },
    {
      name: 'HTML5 & CSS3',
      category: 'frontend',
      icon: '🌐',
      badge: 'Markup & Layout',
      desc: 'Semantic web structure, flexbox, grid, serta responsive web design.',
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
    },
    {
      name: 'JavaScript',
      category: 'frontend',
      icon: '⚡',
      badge: 'OOP & Exploring',
      desc: 'Pemahaman sintaks dasar, konsep Object-Oriented Programming (OOP), serta eksplorasi logika interaktif.',
      color: 'from-yellow-500/20 to-amber-500/20',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
    },
    {
      name: 'C# (.NET)',
      category: 'other',
      icon: '🎯',
      badge: 'Desktop Dev',
      desc: 'Pembuatan aplikasi desktop, event handling, OOP, dan integrasi database.',
      color: 'from-purple-500/20 to-violet-500/20',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
    },
    {
      name: 'Supabase',
      category: 'backend',
      icon: '⚡',
      badge: 'Exploring BaaS',
      desc: 'Backend-as-a-service bertenaga Postgres untuk auth & real-time backend.',
      color: 'from-emerald-500/20 to-green-500/20',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
    },
    {
      name: 'Git & GitHub',
      category: 'other',
      icon: '🐙',
      badge: 'Version Control',
      desc: 'Branching, commit history, pull request, kolaborasi & repository management.',
      color: 'from-slate-500/20 to-zinc-500/20',
      border: 'border-slate-500/30',
      text: 'text-slate-300',
    },
  ];

  const filteredSkills =
    activeTab === 'all'
      ? skills
      : skills.filter((item) => item.category === activeTab);

  return (
    <section id="skills" className="py-20 relative border-t border-slate-900 bg-[#060812]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-emerald-400 text-xs sm:text-sm tracking-wide">
              <span>02. TECH STACK & ARSENAL</span>
              <div className="h-[1px] w-12 bg-emerald-500/40"></div>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Keahlian & Teknologi
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Fokus mendalam pada ekosistem backend, arsitektur data, dan tools pengembangan modern yang saya gunakan.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group relative p-5 rounded-2xl bg-gradient-to-b ${skill.color} to-[#080d1a]/90 border ${skill.border} backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-slate-950/70 border border-slate-800 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-slate-950/80 border border-slate-800 text-slate-300">
                    {skill.badge}
                  </span>
                </div>

                <h3 className={`text-base sm:text-lg font-bold font-mono ${skill.text} group-hover:text-white transition-colors`}>
                  {skill.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              {/* Status footer line */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Ready in Project
                </span>
                <span className="text-slate-600">v-active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Backend Architecture Note */}
        <div className="mt-10 p-5 rounded-2xl bg-[#090e1e]/80 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-mono">
                Backend Architecture Mindset
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Mengutamakan keamanan autentikasi, validasi data di server, skema tabel ter-normalisasi, dan struktur kode modular.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono shrink-0">
            CRUD • REST API • MVC
          </span>
        </div>

      </div>
    </section>
  );
}
