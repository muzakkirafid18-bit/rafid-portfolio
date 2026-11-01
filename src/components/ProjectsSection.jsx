import { useState } from 'react';
import { ExternalLink, FolderGit2, Star, Code2, Layers, Monitor, Gamepad2, Globe, Database, Table, GitFork, ChevronRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);
  const [modalTab, setModalTab] = useState('code'); // 'code' or 'database'

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
      tech: ['PHP Native', 'MySQL (54 Tables)', 'Tailwind CSS', 'JavaScript'],
      github: 'https://github.com/muzakkirafid18-bit/LSP_Tes',
      demo: null,
      description:
        'Aplikasi manajemen uji sertifikasi profesi untuk SMKN 1 Cibinong dengan standar BNSP. Mengelola alur asesmen lengkap mulai dari formulir APL-01/02, pemetaan unit SKKNI, instrumen uji asesor (MAK-02 s/d MAK-07), hingga penerbitan hasil kompetensi. Diakui resmi oleh Neo One Academy sebagai Backend Programmer.',
      keyFeatures: [
        'Arsitektur Database Skala Besar (54 Tabel Relasional di MySQL lsp_p1_db)',
        'Formulir Standar BNSP: APL-01 (Permohonan), APL-02 (Asesmen Mandiri), & MAK Series',
        'Struktur Berjenjang Standar SKKNI: Skema → Unit → Elemen → KUK (Subelemen)',
        'Multi-Role Authentication (Admin LSP, Asesor Penguji, Asesi Siswa, Pengurus)',
      ],
      codeSnippet: `// Contoh Query Relasi Skema & Unit Kompetensi (PHP Native PDO)
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
        description: 'Basis data skala produksi dengan 54 tabel ternormalisasi untuk memfasilitasi seluruh siklus asesmen sertifikasi profesi nasional.',
        summaryBadge: '54 Tabel Aktif • Relational InnoDB',
        tables: [
          {
            name: 'skema',
            type: 'Master Skema BNSP',
            fields: [
              { name: 'id_skema', type: 'INT (PK, Auto Inc)' },
              { name: 'kd_skema', type: 'VARCHAR(50), UNIQUE' },
              { name: 'nama_skema', type: 'VARCHAR(255)' },
              { name: 'jenis_skema', type: 'VARCHAR(100)' },
              { name: 'status', type: 'ENUM("aktif", "nonaktif")' },
            ],
            relation: '1 : N ke unit, apl1, & skemasiswa',
          },
          {
            name: 'unit & unitalias',
            type: 'Unit Kompetensi SKKNI',
            fields: [
              { name: 'id_unit', type: 'INT (PK, Auto Inc)' },
              { name: 'skema_id', type: 'INT (FK -> skema.id_skema)' },
              { name: 'kd_unit', type: 'VARCHAR(50)' },
              { name: 'nama_unit', type: 'VARCHAR(255)' },
              { name: 'jenis_standar', type: 'VARCHAR(50) (SKKNI/Khusus)' },
            ],
            relation: '1 : N ke elemen & unitmak2',
          },
          {
            name: 'elemen & subelemen',
            type: 'Kriteria Unjuk Kerja (KUK)',
            fields: [
              { name: 'id_elemen', type: 'INT (PK, Auto Inc)' },
              { name: 'unit_id', type: 'INT (FK -> unit.id_unit)' },
              { name: 'nama_elemen', type: 'TEXT' },
              { name: 'kuk / subelemen', type: 'TEXT (Kriteria Unjuk Kerja)' },
            ],
            relation: 'N : 1 ke unit kompetensi',
          },
          {
            name: 'apl1 & apl2',
            type: 'Formulir Asesmen Asesi',
            fields: [
              { name: 'id_apl', type: 'INT (PK, Auto Inc)' },
              { name: 'id_asesi', type: 'INT (FK -> users.id)' },
              { name: 'id_skema', type: 'INT (FK -> skema.id_skema)' },
              { name: 'bukti_kelengkapan', type: 'TEXT (Portofolio/Ijazah)' },
              { name: 'rekomendasi_apl', type: 'ENUM("Diterima", "Ditolak")' },
            ],
            relation: 'N : 1 ke users & master skema',
          },
          {
            name: 'mak2, mak4, mak5',
            type: 'Instrumen Penilaian Asesor',
            fields: [
              { name: 'id_mak', type: 'INT (PK, Auto Inc)' },
              { name: 'id_asesor', type: 'INT (FK -> users.id)' },
              { name: 'id_asesi', type: 'INT (FK -> users.id)' },
              { name: 'mak2_rekom', type: 'Verifikasi Portofolio Asesi' },
              { name: 'mak5_rekom', type: 'Keputusan: Kompeten (K) / BK' },
            ],
            relation: 'Instrumen uji lisan, observasi, & laporan akhir',
          },
          {
            name: 'tuk & settanggal',
            type: 'Tempat Uji & Penjadwalan',
            fields: [
              { name: 'id_tuk', type: 'INT (PK, Auto Inc)' },
              { name: 'nama_tuk', type: 'VARCHAR(150)' },
              { name: 'jenis_tuk', type: 'ENUM("Sewaktu", "Mandiri", "Kerja")' },
              { name: 'tgl_asesmen', type: 'DATETIME' },
            ],
            relation: '1 : N ke sesi uji kompetensi asesi',
          },
          {
            name: 'users & lspuser_tbl',
            type: 'Multi-Role Access Control',
            fields: [
              { name: 'id', type: 'INT (PK, Auto Inc)' },
              { name: 'username / no_id', type: 'VARCHAR(100), UNIQUE' },
              { name: 'password', type: 'VARCHAR(255)' },
              { name: 'role', type: 'ENUM("admin", "asesor", "asesi", "pengurus")' },
            ],
            relation: '1 : 1 ke profil asesi / no registrasi asesor (MET)',
          },
          {
            name: 'soal, soalessay, jawabanabc',
            type: 'Bank Soal & Asesmen Tulis',
            fields: [
              { name: 'id_soal', type: 'INT (PK)' },
              { name: 'id_unit', type: 'INT (FK -> unit.id_unit)' },
              { name: 'soal_pertanyaan', type: 'TEXT' },
              { name: 'kunci_jawaban', type: 'VARCHAR(5)' },
            ],
            relation: 'N : 1 ke unit kompetensi',
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
      databaseSchema: {
        engine: 'In-Memory State & JSON Storage',
        description: 'Manajemen state game dinamis untuk inventori, health, koordinat posisi pemain, dan checkpoint progression.',
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
      bannerGradient: 'from-purple-900/40 via-slate-900 to-[#070b16]',
      coverImage: null,
      tech: ['C# WinForms', '.NET Framework', 'Microsoft SQL Server', 'Relational 3NF'],
      github: 'https://github.com/muzakkirafid18-bit',
      demo: null,
      description:
        'Aplikasi standalone berbasis desktop yang dibangun menggunakan C# WinForms dan SQL Server (SistemDonasi.mdf). Mengimplementasikan role-based dashboard untuk Admin, Donatur, dan Penerima Manfaat, lengkap dengan pengelolaan program amal, verifikasi transaksi donasi, dan penyaluran bantuan.',
      keyFeatures: [
        'Multi-Role WinForms: AdminDashboard, DonaturDashboard, & PenerimaDashboard',
        'Database Relasional SQL Server: Users, ProgramDonasi, Donasi, Permohonan, Distribusi',
        'Pengelolaan Saldo Otomatis: Sinkronisasi nominal donasi masuk ke saldo program amal',
        'Verifikasi & Laporan: Validasi transaksi dan pencatatan riwayat distribusi bantuan',
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
        description: 'Skema basis data relasional 3NF lengkap dengan foreign key constraints antara donatur, program amal, permohonan, dan distribusi dana.',
        summaryBadge: '5 Entitas Relasional • SQL Server 3NF',
        tables: [
          {
            name: 'Users',
            type: 'Multi-Role User Entity',
            fields: [
              { name: 'id', type: 'INT (PK, Auto Inc)' },
              { name: 'username', type: 'VARCHAR(50), UNIQUE' },
              { name: 'password', type: 'VARCHAR(255)' },
              { name: 'nama', type: 'VARCHAR(150)' },
              { name: 'no_hp', type: 'VARCHAR(20)' },
              { name: 'alamat', type: 'TEXT' },
              { name: 'role', type: 'VARCHAR(20) ("Admin", "Donatur", "Penerima")' },
            ],
            relation: '1 : N ke Donasi (Donatur) & 1 : N ke Permohonan (Penerima)',
          },
          {
            name: 'ProgramDonasi',
            type: 'Campaign Master Entity',
            fields: [
              { name: 'id', type: 'INT (PK, Auto Inc)' },
              { name: 'nama_program', type: 'VARCHAR(200)' },
              { name: 'target_dana', type: 'DECIMAL(18, 2)' },
              { name: 'saldo', type: 'DECIMAL(18, 2)' },
              { name: 'deadline', type: 'DATETIME' },
              { name: 'status', type: 'VARCHAR(20) ("Aktif", "Selesai")' },
            ],
            relation: '1 : N ke Donasi & 1 : N ke Permohonan',
          },
          {
            name: 'Donasi',
            type: 'Donation Transaction Ledger',
            fields: [
              { name: 'id', type: 'INT (PK, Auto Inc)' },
              { name: 'id_program', type: 'INT (FK -> ProgramDonasi.id)' },
              { name: 'id_donatur', type: 'INT (FK -> Users.id)' },
              { name: 'jumlah', type: 'DECIMAL(18, 2)' },
              { name: 'pesan', type: 'TEXT' },
              { name: 'status', type: 'VARCHAR(20) ("Pending", "Terverifikasi", "Ditolak")' },
              { name: 'tanggal', type: 'DATETIME' },
            ],
            relation: 'N : 1 ke ProgramDonasi & N : 1 ke Users (Donatur)',
          },
          {
            name: 'Permohonan',
            type: 'Aid Request Entity',
            fields: [
              { name: 'id', type: 'INT (PK, Auto Inc)' },
              { name: 'id_program', type: 'INT (FK -> ProgramDonasi.id)' },
              { name: 'id_penerima', type: 'INT (FK -> Users.id)' },
              { name: 'nama_kebutuhan', type: 'VARCHAR(200)' },
              { name: 'jumlah_dibutuhkan', type: 'DECIMAL(18, 2)' },
              { name: 'alasan', type: 'TEXT' },
              { name: 'status', type: 'VARCHAR(20) ("Menunggu", "Disetujui", "Ditolak")' },
              { name: 'tanggal', type: 'DATETIME' },
            ],
            relation: 'N : 1 ke Users (Penerima) & 1 : 1 ke Distribusi',
          },
          {
            name: 'Distribusi',
            type: 'Disbursement Ledger',
            fields: [
              { name: 'id', type: 'INT (PK, Auto Inc)' },
              { name: 'id_permohonan', type: 'INT (FK -> Permohonan.id)' },
              { name: 'jumlah', type: 'DECIMAL(18, 2)' },
              { name: 'catatan_admin', type: 'TEXT' },
              { name: 'tanggal_distribusi', type: 'DATETIME' },
            ],
            relation: '1 : 1 dengan Permohonan yang disetujui',
          },
        ],
      },
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
                  <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-md">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-transparent opacity-60"></div>
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

                  <div className="mt-4 space-y-1.5">
                    {item.keyFeatures.slice(0, 4).map((feat, idx) => (
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
                      onClick={() => {
                        setActiveProject(item);
                        setModalTab('database');
                      }}
                      className="text-xs font-mono text-slate-300 hover:text-emerald-400 px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-800 transition-colors border border-slate-700/60 flex items-center gap-1.5"
                    >
                      <Database className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Detail & DB</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Specs with Database ERD */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div className="w-full max-w-3xl bg-[#090e1d] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
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
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
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

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Deskripsi Lengkap</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase text-slate-400">Fitur & Implementasi Kunci</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.keyFeatures.map((feat, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Tabs: Database Relational Schema vs Code Architecture */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <button
                    onClick={() => setModalTab('database')}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-colors ${
                      modalTab === 'database'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Skema Database Relasional (ERD)</span>
                  </button>

                  <button
                    onClick={() => setModalTab('code')}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-colors ${
                      modalTab === 'code'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Arsitektur Kode</span>
                  </button>
                </div>

                {modalTab === 'code' ? (
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    {activeProject.codeSnippet}
                  </pre>
                ) : (
                  <div className="space-y-3 bg-[#060a16] p-4 rounded-2xl border border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <Table className="w-3.5 h-3.5" />
                        <span>Engine: {activeProject.databaseSchema.engine}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                        {activeProject.databaseSchema.summaryBadge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {activeProject.databaseSchema.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {activeProject.databaseSchema.tables.map((tbl, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1">
                              <span>🗄️</span>
                              <span>{tbl.name}</span>
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                              {tbl.type}
                            </span>
                          </div>

                          <div className="space-y-1 font-mono text-[11px] text-slate-300">
                            {tbl.fields.map((f, fIdx) => (
                              <div key={fIdx} className="flex items-center justify-between gap-2">
                                <span className="text-slate-200">{f.name}</span>
                                <span className="text-slate-500 text-[10px] truncate max-w-[150px]">{f.type}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-cyan-400/90 flex items-center gap-1">
                            <GitFork className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span className="truncate">{tbl.relation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-500">
                  SMKN 1 Cibinong • Rekayasa Perangkat Lunak
                </span>

                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs font-mono flex items-center gap-2 hover:bg-emerald-400 transition-colors"
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
