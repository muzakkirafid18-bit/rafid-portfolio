import { useState } from 'react';
import { Terminal, Send, Check, Copy, Sparkles, RefreshCw, Layers, Server, Globe } from 'lucide-react';

export default function ApiPlayground() {
  const endpoints = [
    {
      id: 'profile',
      method: 'GET',
      path: '/api/v1/profile',
      label: 'Developer Profile',
      desc: 'Mengambil biodata, role, dan fokus teknis backend developer.',
      response: {
        status: 200,
        statusText: 'OK',
        data: {
          name: 'Rafid Muzakki Putra Andryan',
          alias: 'Rafid',
          school: 'SMKN 1 Cibinong',
          major: 'Pengembangan Perangkat Lunak dan Gim (PPLG)',
          location: 'Cibinong, Kab. Bogor, Indonesia',
          primary_roles: [
            'Backend Developer',
            'Laravel Artisan',
            'PHP Native & Database Architect'
          ],
          available_for: ['Internship / PKL', 'Freelance Projects', 'Collaboration'],
          socials: {
            github: 'https://github.com/muzakkirafid18-bit',
            linkedin: 'https://www.linkedin.com/in/rafid-muzakki-1069733a8/',
            email: 'muzakkirafid18@gmail.com'
          }
        }
      }
    },
    {
      id: 'stack',
      method: 'GET',
      path: '/api/v1/stack?category=backend',
      label: 'Backend & Database Stack',
      desc: 'Query keahlian teknologi backend, framework, dan sistem database relasional.',
      response: {
        status: 200,
        statusText: 'OK',
        data: {
          category: 'backend_and_database',
          frameworks: ['Laravel 11', 'PHP 8.x Native'],
          databases: [
            { engine: 'MySQL', proficiency: 'Large-scale Relational Design (50+ Tables), Prepared Statements, Indexes' },
            { engine: 'PostgreSQL', proficiency: 'Relational Schemas, Constraints, SQL Queries' },
            { engine: 'Microsoft SQL Server', proficiency: 'WinForms C# Desktop Storage (.mdf), Constraints' },
            { engine: 'Supabase', proficiency: 'Exploring BaaS & Auth' }
          ],
          concepts: [
            'RESTful API Architecture',
            'Prepared Statements / SQL Injection Prevention',
            'Relational Schema Normalization (3NF)',
            'Multi-Role Authentication & Session Guards'
          ]
        }
      }
    },
    {
      id: 'lsp',
      method: 'GET',
      path: '/api/v1/projects/lsp',
      label: 'Project: LSP SMKN 1 Cibinong (54 Tables)',
      desc: 'Detail arsitektur database MySQL lsp_p1_db dengan 54 tabel standar BNSP.',
      response: {
        status: 200,
        statusText: 'OK',
        data: {
          project_name: 'Aplikasi LSP SMKN 1 Cibinong',
          repo_url: 'https://github.com/muzakkirafid18-bit/LSP_Tes',
          role: 'Backend Programmer (Validated by Neo One Academy)',
          database: {
            name: 'lsp_p1_db',
            engine: 'MySQL 8.0 InnoDB',
            total_tables: 54,
            subsystems: {
              bnsp_assessment_forms: ['apl1', 'apl2', 'mma', 'mak2', 'mak2rekom', 'mak4', 'mak4rekom', 'mak5', 'mak5baru', 'mak7', 'banding'],
              skkni_standards: ['skema', 'unit', 'unitalias', 'elemen', 'subelemen (KUK)', 'syarat'],
              participants_and_execution: ['tuk', 'settanggal', 'tanggaltes', 'skemasiswa', 'unitsiswa', 'soal', 'soalessay', 'jawabanabc'],
              security_and_auth: ['users', 'lspuser_tbl', 'lsp_usertbl', 'statuskerja']
            }
          },
          tech_stack: ['PHP Native', 'MySQL', 'Tailwind CSS', 'JavaScript']
        }
      }
    },
    {
      id: 'donasi',
      method: 'GET',
      path: '/api/v1/projects/donasi',
      label: 'Project: Sistem Donasi C# (SQL Server)',
      desc: 'Skema relasional SistemDonasi.mdf untuk aplikasi C# WinForms.',
      response: {
        status: 200,
        statusText: 'OK',
        data: {
          project_name: 'Aplikasi Donasi Desktop C# (.NET)',
          database: {
            name: 'SistemDonasi.mdf',
            engine: 'Microsoft SQL Server',
            entities: [
              { name: 'Users', role: 'Admin, Donatur, Penerima', relations: '1:N Donasi & 1:N Permohonan' },
              { name: 'ProgramDonasi', purpose: 'Campaign Amal & Target Dana', relations: '1:N Donasi' },
              { name: 'Donasi', purpose: 'Transaksi Donasi Masuk', relations: 'N:1 Users & N:1 ProgramDonasi' },
              { name: 'Permohonan', purpose: 'Pengajuan Bantuan Dana', relations: 'N:1 Users & 1:1 Distribusi' },
              { name: 'Distribusi', purpose: 'Pencairan Dana Terverifikasi', relations: '1:1 Permohonan' }
            ]
          },
          architecture_pattern: 'WinForms Multi-Role Dashboard with DbHelper Data Layer'
        }
      }
    },
    {
      id: 'certifications',
      method: 'GET',
      path: '/api/v1/certifications',
      label: 'Verified Credentials',
      desc: 'Daftar validasi industri dan sertifikat kelulusan pelatihan.',
      response: {
        status: 200,
        statusText: 'OK',
        data: {
          industry_validation: {
            issuer: 'Neo One Academy',
            title: 'Professional Recognition: Backend Programmer',
            project: 'LSP SMKN 1 Cibinong',
            date: '2026-05-22',
            status: 'Verified by Industry'
          },
          course_certifications: [
            {
              platform: 'Dicoding Indonesia & Google Developers',
              title: 'Memulai Pemrograman dengan Dart',
              hours: 30,
              credential_id: 'L4PQW30L2PO1',
              verified_url: 'https://www.dicoding.com/certificates/L4PQW30L2PO1'
            },
            {
              platform: 'Dicoding Indonesia & Google Developers',
              title: 'Belajar Membuat Aplikasi Flutter untuk Pemula',
              hours: 40,
              credential_id: 'ERZR7M50QZYV',
              verified_url: 'https://www.dicoding.com/certificates/ERZR7M50QZYV'
            }
          ],
          upcoming_target: '2x Skema Uji Kompetensi Nasional BNSP (Bulan Ini)'
        }
      }
    },
    {
      id: 'ping',
      method: 'POST',
      path: '/api/v1/ping',
      label: 'Server Health Check (POST)',
      desc: 'Simulasi ping heartbeat untuk verifikasi kesiapan sistem.',
      response: {
        status: 200,
        statusText: 'OK',
        data: {
          service: 'rafid-backend-api',
          health: 'healthy',
          uptime: '99.98%',
          database_connection: 'connected (MySQL 8.0 & PostgreSQL & SQL Server)',
          timestamp: new Date().toISOString(),
          message: 'Backend API ready to process requests and collaboration!'
        }
      }
    }
  ];

  const [activeEndpoint, setActiveEndpoint] = useState(endpoints[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseLog, setResponseLog] = useState(endpoints[0].response);
  const [latency, setLatency] = useState(38);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('body'); // 'body' or 'curl'

  const handleExecute = () => {
    setIsLoading(true);
    const simulatedLatency = Math.floor(Math.random() * 25) + 28; // 28 - 53ms

    setTimeout(() => {
      setLatency(simulatedLatency);
      setResponseLog(activeEndpoint.response);
      setIsLoading(false);
    }, 280);
  };

  const handleSelectEndpoint = (ep) => {
    setActiveEndpoint(ep);
    setIsLoading(true);
    setTimeout(() => {
      setLatency(Math.floor(Math.random() * 20) + 30);
      setResponseLog(ep.response);
      setIsLoading(false);
    }, 200);
  };

  const handleCopy = () => {
    const textToCopy =
      activeTab === 'body'
        ? JSON.stringify(responseLog, null, 2)
        : `curl -X ${activeEndpoint.method} https://rafid-dev-portfolio.vercel.app${activeEndpoint.path} \\
  -H "Accept: application/json"`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-playground" className="py-24 relative bg-[#060914]/80 border-t border-slate-900 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-emerald-400 text-xs sm:text-sm tracking-wide">
            <span>05. BACKEND API CONSOLE</span>
            <div className="h-[1px] w-12 bg-emerald-500/40"></div>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
            Interactive REST API Playground
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Sebagai backend developer, saya mendesain endpoint yang terstruktur. Uji coba langsung respon JSON mock di bawah ini seperti menggunakan Postman atau Swagger.
          </p>
        </div>

        {/* Main Console Box */}
        <div className="rounded-3xl bg-[#080d1e] border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Top Titlebar */}
          <div className="px-6 py-4 bg-[#090f23] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="h-4 w-[1px] bg-slate-800 mx-1"></div>
              <span className="font-mono text-xs text-slate-300 flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span>API Gateway Client v1.0.4</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                HTTP 200 OK
              </span>
              <span className="text-slate-500">
                Latency: <span className="text-cyan-400 font-bold">{latency}ms</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
            
            {/* Left: Endpoint List Selector (5 cols) */}
            <div className="lg:col-span-5 p-5 sm:p-6 space-y-3 bg-[#080c1b]/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Pilih Endpoint API
                </span>
                <span className="text-[11px] font-mono text-emerald-400/80">
                  {endpoints.length} Routes
                </span>
              </div>

              <div className="space-y-2">
                {endpoints.map((ep) => {
                  const isSelected = activeEndpoint.id === ep.id;
                  return (
                    <button
                      key={ep.id}
                      onClick={() => handleSelectEndpoint(ep)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex flex-col gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${
                              ep.method === 'GET'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {ep.method}
                          </span>
                          <span className="font-mono text-xs font-semibold text-white">
                            {ep.path}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans line-clamp-1">
                        {ep.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Pro tip hint */}
              <div className="pt-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Respon disimulasikan sesuai struktur REST API standar dengan format JSON terstruktur & HTTP headers.
                  </span>
                </div>
              </div>
            </div>

            {/* Right: URL Execution Bar & JSON Response Window (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-[#060a17]">
              
              {/* URL Request Bar */}
              <div className="p-5 border-b border-slate-800/80 bg-slate-950/40 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold ${
                      activeEndpoint.method === 'GET'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {activeEndpoint.method}
                  </span>

                  <div className="flex-1 px-4 py-2 rounded-xl bg-[#080d1f] border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto flex items-center">
                    <span className="text-slate-500 select-none">https://rafid-api.dev</span>
                    <span className="text-emerald-400 font-semibold">{activeEndpoint.path}</span>
                  </div>

                  <button
                    onClick={handleExecute}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>{isLoading ? 'Fetching...' : 'Send'}</span>
                  </button>
                </div>

                {/* Sub Tab: Response Body vs cURL */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <button
                      onClick={() => setActiveTab('body')}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        activeTab === 'body'
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Response JSON
                    </button>
                    <button
                      onClick={() => setActiveTab('curl')}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        activeTab === 'curl'
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      cURL Command
                    </button>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy {activeTab === 'body' ? 'JSON' : 'cURL'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* JSON Output Display */}
              <div className="p-5 font-mono text-xs overflow-x-auto flex-1 max-h-[420px] bg-[#050813]">
                {activeTab === 'body' ? (
                  <pre className="text-emerald-300/90 leading-relaxed font-mono select-all">
                    {JSON.stringify(responseLog, null, 2)}
                  </pre>
                ) : (
                  <div className="space-y-3">
                    <p className="text-slate-400 text-xs">
                      Eksekusi request ini dari terminal kamu menggunakan perintah cURL:
                    </p>
                    <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 leading-relaxed overflow-x-auto">
{`curl -X ${activeEndpoint.method} "https://rafid-dev-portfolio.vercel.app${activeEndpoint.path}" \\
  -H "Accept: application/json" \\
  -H "User-Agent: RafidClient/1.0"`}
                    </pre>
                  </div>
                )}
              </div>

              {/* Bottom metadata footer */}
              <div className="px-5 py-3 border-t border-slate-800/80 bg-[#080d1e] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <span>
                    Status: <strong className="text-emerald-400">200 OK</strong>
                  </span>
                  <span>
                    Content-Type: <strong className="text-slate-300">application/json</strong>
                  </span>
                </div>
                <div>
                  <span>Response Time: <strong className="text-cyan-400">{latency} ms</strong></span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
