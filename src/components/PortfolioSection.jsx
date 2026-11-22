import { useState } from 'react';
import {
  FolderGit2,
  Award,
  Trophy,
  Cpu,
  Globe,
  Gamepad2,
  Monitor,
  ExternalLink,
  Database,
  Code2,
  Table,
  GitFork,
  Image as ImageIcon,
  FileText,
  Star,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from './Icons';

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'certificates' | 'achievements' | 'tech'
  const [activeProject, setActiveProject] = useState(null);
  const [modalTab, setModalTab] = useState('database'); // 'database' | 'code'
  const [selectedCert, setSelectedCert] = useState(null);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" />, count: 3 },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-4 h-4" />, count: 4 },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" />, count: 3 },
    { id: 'tech', label: 'Tech Stack', icon: <Cpu className="w-4 h-4" />, count: 11 },
  ];

  const projects = [
    {
      id: 'lsp',
      title: 'Aplikasi LSP SMKN 1 Cibinong',
      subtitle: 'Sistem Informasi Lembaga Sertifikasi Profesi Berbasis Web',
      category: 'Web Application',
      featured: true,
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      coverImage: '/lsp-screenshot.png',
      tech: ['PHP Native', 'MySQL (54 Tables)', 'Tailwind CSS', 'JavaScript'],
      github: 'https://github.com/muzakkirafid18-bit/LSP_Tes',
      description:
        'Aplikasi manajemen uji sertifikasi profesi standar BNSP untuk SMKN 1 Cibinong. Mengelola alur asesmen lengkap mulai dari APL-01/02, pemetaan unit SKKNI, instrumen asesor (MAK-02 s/d MAK-07), hingga hasil kompetensi.',
      keyFeatures: [
        'Arsitektur Database Skala Besar (54 Tabel Relasional di MySQL lsp_p1_db)',
        'Formulir Standar BNSP: APL-01, APL-02, MMA, & MAK Series',
        'Struktur Berjenjang SKKNI: Skema → Unit → Elemen → KUK (Subelemen)',
        'Multi-Role Authentication (Admin LSP, Asesor, Asesi, Pengurus)',
      ],
      codeSnippet: `// Query Relasi Skema & Unit Kompetensi (PHP Native PDO)
$stmt = $pdo->prepare("
    SELECT s.id, s.kode_skema, s.nama_skema, u.kode_unit, u.judul_unit 
    FROM skema s 
    LEFT JOIN unit u ON s.id = u.skema_id 
    WHERE s.status = :status 
    ORDER BY u.kode_unit ASC
");
$stmt->execute(['status' => 'aktif']);
$skemaData = $stmt->fetchAll(PDO::FETCH_ASSOC);`,
      databaseSchema: {
        engine: 'MySQL 8.0 (Database: lsp_p1_db • 54 Tables Total)',
        description:
          'Basis data skala produksi dengan 54 tabel ternormalisasi untuk memfasilitasi seluruh siklus asesmen sertifikasi profesi nasional.',
        summaryBadge: '54 Tabel Aktif • Relational InnoDB',
        tables: [
          {
            name: 'skema',
            type: 'Master Skema BNSP',
            fields: [
              { name: 'id_skema', type: 'INT (PK, Auto Inc)' },
              { name: 'kd_skema', type: 'VARCHAR(50), UNIQUE' },
              { name: 'nama_skema', type: 'VARCHAR(255)' },
              { name: 'status', type: 'ENUM("aktif", "nonaktif")' },
            ],
            relation: '1 : N ke unit, apl1, & skemasiswa',
          },
          {
            name: 'unit & elemen',
            type: 'Struktur SKKNI',
            fields: [
              { name: 'id_unit', type: 'INT (PK, Auto Inc)' },
              { name: 'skema_id', type: 'INT (FK -> skema.id_skema)' },
              { name: 'kd_unit', type: 'VARCHAR(50)' },
              { name: 'subelemen (KUK)', type: 'TEXT (Kriteria Unjuk Kerja)' },
            ],
            relation: '1 : N berjenjang Unit → Elemen → KUK',
          },
          {
            name: 'apl1 & apl2',
            type: 'Formulir Asesmen',
            fields: [
              { name: 'id_apl', type: 'INT (PK, Auto Inc)' },
              { name: 'id_asesi', type: 'INT (FK -> users.id)' },
              { name: 'id_skema', type: 'INT (FK -> skema.id_skema)' },
              { name: 'rekomendasi_apl', type: 'ENUM("Diterima", "Ditolak")' },
            ],
            relation: 'N : 1 ke users & master skema',
          },
          {
            name: 'mak2, mak4, mak5',
            type: 'Instrumen Uji Asesor',
            fields: [
              { name: 'id_mak', type: 'INT (PK, Auto Inc)' },
              { name: 'id_asesor', type: 'INT (FK -> users.id)' },
              { name: 'id_asesi', type: 'INT (FK -> users.id)' },
              { name: 'mak5_rekom', type: 'Keputusan: Kompeten (K) / BK' },
            ],
            relation: 'Instrumen uji lisan, observasi, & laporan akhir',
          },
        ],
      },
    },
    {
      id: 'advenland',
      title: 'Game Advenland',
      subtitle: 'Interactive Adventure & Logic Game',
      category: 'Game Project',
      featured: false,
      icon: <Gamepad2 className="w-5 h-5 text-indigo-400" />,
      coverImage: null,
      tech: ['Game Logic', 'State Management', 'Interactive Systems'],
      github: 'https://github.com/muzakkirafid18-bit',
      description:
        'Game bertema petualangan dengan eksplorasi dunia interaktif, mekanik teka-teki logika, dan manajemen progression pemain. Mengasah computational thinking dan penanganan state game.',
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
      databaseSchema: {
        engine: 'In-Memory State & JSON Storage',
        description: 'Manajemen state game dinamis untuk inventori, health, posisi pemain, dan checkpoint progression.',
        summaryBadge: 'Runtime State Engine',
        tables: [
          {
            name: 'player_state',
            type: 'Runtime Struct',
            fields: [
              { name: 'player_id', type: 'UUID' },
              { name: 'hp_current', type: 'INT (0 - 100)' },
              { name: 'checkpoint_id', type: 'INT' },
              { name: 'inventory_items', type: 'ARRAY[ItemID]' },
            ],
            relation: 'In-memory persistent local state',
          },
        ],
      },
    },
    {
      id: 'donasi',
      title: 'Aplikasi Donasi Desktop C#',
      subtitle: 'Sistem Informasi Pengelolaan & Rekapitulasi Donasi',
      category: 'Desktop Software',
      featured: false,
      icon: <Monitor className="w-5 h-5 text-purple-400" />,
      coverImage: null,
      tech: ['C# WinForms', '.NET Framework', 'SQL Server', 'Relational 3NF'],
      github: 'https://github.com/muzakkirafid18-bit',
      description:
        'Aplikasi standalone desktop C# WinForms + SQL Server (SistemDonasi.mdf). Mengimplementasikan role-based dashboard (Admin, Donatur, Penerima Manfaat), pengelolaan program amal, dan penyaluran dana.',
      keyFeatures: [
        'Multi-Role WinForms: AdminDashboard, DonaturDashboard, & PenerimaDashboard',
        'Database Relasional SQL Server: Users, ProgramDonasi, Donasi, Permohonan, Distribusi',
        'Pengelolaan Saldo Otomatis & Validasi Transaksi',
      ],
      codeSnippet: `// C# Data Transaction Handler (DbHelper.cs)
public static void SubmitDonasi(int idProgram, int idDonatur, decimal jumlah, string pesan) {
    using (SqlConnection conn = new SqlConnection(ConnectionString)) {
        string query = "INSERT INTO Donasi (id_program, id_donatur, jumlah, pesan, status, tanggal) " +
                       "VALUES (@program, @donatur, @jumlah, @pesan, 'Pending', GETDATE())";
        SqlCommand cmd = new SqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@program", idProgram);
        cmd.Parameters.AddWithValue("@donatur", idDonatur);
        cmd.Parameters.AddWithValue("@jumlah", jumlah);
        cmd.Parameters.AddWithValue("@pesan", pesan);
        conn.Open();
        cmd.ExecuteNonQuery();
    }
}`,
      databaseSchema: {
        engine: 'Microsoft SQL Server (Database: SistemDonasi.mdf)',
        description:
          'Skema basis data relasional 3NF lengkap dengan foreign key constraints antara donatur, program amal, permohonan, dan distribusi dana.',
        summaryBadge: '5 Entitas Relasional • SQL Server 3NF',
        tables: [
          {
            name: 'Users',
            type: 'Multi-Role User Entity',
            fields: [
              { name: 'id', type: 'INT (PK, Auto Inc)' },
              { name: 'username', type: 'VARCHAR(50), UNIQUE' },
              { name: 'role', type: 'Admin / Donatur / Penerima' },
            ],
            relation: '1 : N ke Donasi & Permohonan',
          },
          {
            name: 'ProgramDonasi',
            type: 'Campaign Master',
            fields: [
              { name: 'id', type: 'INT (PK, Auto Inc)' },
              { name: 'nama_program', type: 'VARCHAR(200)' },
              { name: 'target_dana & saldo', type: 'DECIMAL(18, 2)' },
            ],
            relation: '1 : N ke Donasi & Permohonan',
          },
          {
            name: 'Donasi & Permohonan',
            type: 'Transaction Ledgers',
            fields: [
              { name: 'id_program', type: 'INT (FK -> ProgramDonasi.id)' },
              { name: 'id_donatur / id_penerima', type: 'INT (FK -> Users.id)' },
              { name: 'jumlah', type: 'DECIMAL(18, 2)' },
            ],
            relation: 'N : 1 ke Users & ProgramDonasi',
          },
          {
            name: 'Distribusi',
            type: 'Disbursement Ledger',
            fields: [
              { name: 'id_permohonan', type: 'INT (FK -> Permohonan.id)' },
              { name: 'jumlah', type: 'DECIMAL(18, 2)' },
              { name: 'tanggal_distribusi', type: 'DATETIME' },
            ],
            relation: '1 : 1 dengan Permohonan yang disetujui',
          },
        ],
      },
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
      image: '/sertifikat-dicoding-dart.png',
      verifyUrl: 'https://www.dicoding.com/certificates/L4PQW30L2PO1',
      pdfUrl: '/sertifikat-dicoding-dart.pdf',
      desc: 'Sertifikat kelulusan materi dan tugas submission pemrograman bahasa Dart (OOP, Collections, Type System, Futures). Total 30 jam belajar.',
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
      image: '/sertifikat-dicoding-flutter.png',
      verifyUrl: 'https://www.dicoding.com/certificates/ERZR7M50QZYV',
      pdfUrl: '/sertifikat-dicoding-flutter.pdf',
      desc: 'Sertifikat kelulusan materi dan submission proyek akhir pembuatan aplikasi Flutter (Widget Layout, Navigation, Build APK/Web). Total 40 jam belajar.',
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
      icon: '🚀',
    },
  ];

  const achievements = [
    {
      title: 'Validasi Industri: Backend Programmer (LSP SMKN 1 Cibinong)',
      issuer: 'Neo One Academy',
      year: '2026',
      desc: 'Mendapatkan Professional Recognition Certificate dari mitra industri atas kontribusi nyata membangun arsitektur backend aplikasi LSP berskala 54 tabel MySQL.',
      badge: 'Industry Recognition',
    },
    {
      title: '70+ Jam Kurikulum Standar Industri Google Developers',
      issuer: 'Dicoding Indonesia',
      year: '2026',
      desc: 'Menyelesaikan kelas dan proyek submission Memulai Pemrograman dengan Dart (30 jam) serta Membuat Aplikasi Flutter untuk Pemula (40 jam).',
      badge: 'Verified Graduate',
    },
    {
      title: 'Kandidat 2x Uji Kompetensi Nasional BNSP',
      issuer: 'BNSP / SMKN 1 Cibinong',
      year: 'Target Bulan Ini',
      desc: 'Terpilih mengikuti persiapan intensif 2 skema uji kompetensi sertifikasi profesi nasional bidang Rekayasa Perangkat Lunak.',
      badge: 'Upcoming Milestone',
    },
  ];

  const techStack = [
    { name: 'PHP Native', category: 'Backend', badge: 'Core', icon: '🐘', desc: 'PDO Prepared Statements, Session Auth, & Arsitektur Modular.' },
    { name: 'Laravel', category: 'Backend', badge: 'Framework', icon: '🔥', desc: 'MVC, Routing, Eloquent ORM, Migrations, & Blade.' },
    { name: 'MySQL', category: 'Database', badge: '54+ Tables', icon: '🐬', desc: 'Normalisasi 3NF, Foreign Keys, Indexing, & Relasi Kompleks.' },
    { name: 'PostgreSQL', category: 'Database', badge: 'Relational', icon: '🐘', desc: 'Skema relasional ketat, constraints, dan query analitik.' },
    { name: 'SQL Server', category: 'Database', badge: '.NET Data', icon: '🗄️', desc: 'Integrasi .mdf untuk aplikasi desktop C# WinForms.' },
    { name: 'Supabase', category: 'BaaS', badge: 'Exploring', icon: '⚡', desc: 'PostgreSQL cloud, REST API & real-time storage.' },
    { name: 'JavaScript', category: 'Frontend', badge: 'OOP & Exploring', icon: '✨', desc: 'Sintaks dasar, konsep OOP, serta eksplorasi logika interaktif.' },
    { name: 'Tailwind CSS', category: 'Frontend', badge: 'Styling', icon: '🎨', desc: 'Responsive UI modern, glassmorphism, & utility classes.' },
    { name: 'HTML5 & CSS3', category: 'Frontend', badge: 'Markup', icon: '🌐', desc: 'Struktur semantik, Flexbox, Grid, dan animasi CSS.' },
    { name: 'C# (.NET)', category: 'Desktop', badge: 'WinForms', icon: '🎯', desc: 'OOP, Multi-Role Desktop UI, dan SQL Server integration.' },
    { name: 'Git & GitHub', category: 'Tools', badge: 'VCS', icon: '🐙', desc: 'Branching, commit history, & kolaborasi repository.' },
  ];

  return (
    <section id="Portofolio" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            Showcase & Credentials
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">
            Portfolio
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Jelajahi proyek nyata, sertifikat kelulusan & validasi industri, pencapaian, serta teknologi yang saya kuasai.
          </p>
        </div>

        {/* 4 Category Tabs (alfari.my.id style) */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl font-medium text-xs sm:text-sm inline-flex items-center gap-2 transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.45)] border border-blue-400/50'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 animate-in fade-in">
            {projects.map((item) => (
              <div
                key={item.id}
                className="cosmic-card rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Top Preview */}
                <div className="relative border-b border-white/10 bg-[#080b1c] overflow-hidden">
                  {item.featured && (
                    <span className="absolute top-3.5 right-3.5 z-10 px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/50 text-blue-200 text-[11px] font-mono font-semibold flex items-center gap-1 backdrop-blur-md">
                      <Star className="w-3 h-3 fill-blue-400 text-blue-400" /> Featured
                    </span>
                  )}

                  {item.coverImage ? (
                    <div className="relative">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060816] via-transparent to-transparent"></div>
                    </div>
                  ) : (
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                          {item.icon}
                        </div>
                        <span className="text-[11px] font-mono uppercase text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      <div className="rounded-xl bg-[#040611] p-3 border border-white/10 font-mono text-[11px] text-blue-300/80 overflow-hidden">
                        <pre className="leading-relaxed">
                          {item.codeSnippet.split('\n').slice(0, 4).join('\n')}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-1 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>

                      <button
                        onClick={() => {
                          setActiveProject(item);
                          setModalTab('database');
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/40 text-blue-200 text-xs font-mono font-semibold transition-all"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="cosmic-card rounded-3xl p-5 flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
                    {cert.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {cert.issuer} • <span className="font-mono text-blue-300">{cert.date}</span>
                    </p>
                  </div>
                </div>

                {cert.image && (
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all relative aspect-[16/10] bg-[#040611] group/img"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-xs font-mono text-white flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-blue-400" /> Klik untuk perbesar
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-400 leading-relaxed">{cert.desc}</p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300">
                    {cert.status}
                  </span>

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-xs font-mono text-slate-300 hover:text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 transition-colors"
                  >
                    {cert.image ? <ImageIcon className="w-3.5 h-3.5 text-blue-400" /> : <FileText className="w-3.5 h-3.5 text-indigo-400" />}
                    <span>Lihat Detail</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
            {achievements.map((ach, idx) => (
              <div key={idx} className="cosmic-card rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400">
                      <Trophy className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200">
                      {ach.year}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white leading-snug">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-mono text-blue-300">{ach.issuer}</p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {ach.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-mono text-blue-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{ach.badge}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: TECH STACK */}
        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in">
            {techStack.map((tech, idx) => (
              <div key={idx} className="cosmic-card rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">
                      {tech.icon}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        {tech.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300">
                    {tech.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Modal Detail Specs & Database ERD */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div className="w-full max-w-3xl bg-[#070a1b] border border-blue-500/35 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase">
                    {activeProject.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                    {activeProject.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {activeProject.coverImage && (
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={activeProject.coverImage}
                    alt={activeProject.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeProject.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeProject.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-2"
                  >
                    <span className="text-blue-400 font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Modal Tabs: Database ERD vs Code */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <button
                    onClick={() => setModalTab('database')}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-colors ${
                      modalTab === 'database'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Skema Database Relasional (ERD)</span>
                  </button>
                  <button
                    onClick={() => setModalTab('code')}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-colors ${
                      modalTab === 'code'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Arsitektur Kode</span>
                  </button>
                </div>

                {modalTab === 'code' ? (
                  <pre className="p-4 rounded-2xl bg-[#040611] border border-white/10 text-xs font-mono text-blue-300 overflow-x-auto leading-relaxed">
                    {activeProject.codeSnippet}
                  </pre>
                ) : (
                  <div className="space-y-3 bg-[#040611] p-4 rounded-2xl border border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-blue-400 font-bold flex items-center gap-1.5">
                        <Table className="w-3.5 h-3.5" />
                        <span>Engine: {activeProject.databaseSchema.engine}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-[10px]">
                        {activeProject.databaseSchema.summaryBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeProject.databaseSchema.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {activeProject.databaseSchema.tables.map((tbl, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2"
                        >
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span className="font-mono text-xs font-bold text-blue-300">
                              🗄️ {tbl.name}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-indigo-300">
                              {tbl.type}
                            </span>
                          </div>
                          <div className="space-y-1 font-mono text-[11px] text-slate-300">
                            {tbl.fields.map((f, fIdx) => (
                              <div key={fIdx} className="flex items-center justify-between gap-2">
                                <span>{f.name}</span>
                                <span className="text-slate-500 text-[10px] truncate max-w-[145px]">
                                  {f.type}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-blue-300/90 flex items-center gap-1">
                            <GitFork className="w-3 h-3 shrink-0" />
                            <span className="truncate">{tbl.relation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-3 border-t border-white/10">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs font-mono inline-flex items-center gap-2 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" /> Buka Repository
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal Certificate Preview */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div className="w-full max-w-2xl bg-[#070a1b] border border-blue-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                    {selectedCert.type}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Penerbit: {selectedCert.issuer}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {selectedCert.image ? (
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#040611]">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
                  <Award className="w-12 h-12 text-blue-400 mx-auto" />
                  <h4 className="font-mono text-base font-bold text-white">{selectedCert.title}</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">{selectedCert.desc}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                <span className="text-xs font-mono text-slate-400">
                  ID: {selectedCert.credentialId}
                </span>
                <div className="flex items-center gap-2">
                  {selectedCert.verifyUrl && (
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs font-mono inline-flex items-center gap-1.5"
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
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs font-mono inline-flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span>Buka PDF</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono"
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
