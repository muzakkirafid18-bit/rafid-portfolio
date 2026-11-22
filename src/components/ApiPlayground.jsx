import { useState } from 'react';
import { Send, Check, Copy, Sparkles, RefreshCw, Server } from 'lucide-react';

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
          primary_roles: ['Backend Developer', 'Laravel Artisan', 'PHP Native & Database Architect'],
          available_for: ['Internship / PKL', 'Freelance Projects', 'Collaboration'],
          socials: {
            github: 'https://github.com/muzakkirafid18-bit',
            linkedin: 'https://www.linkedin.com/in/rafid-muzakki-1069733a8/',
            email: 'muzakkirafid18@gmail.com',
          },
        },
      },
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
            { engine: 'MySQL', proficiency: 'Large-scale Relational Design (54 Tables), Prepared Statements' },
            { engine: 'PostgreSQL', proficiency: 'Relational Schemas, Constraints, SQL Queries' },
            { engine: 'Microsoft SQL Server', proficiency: 'WinForms C# Desktop Storage (.mdf), Constraints' },
            { engine: 'Supabase', proficiency: 'Exploring BaaS & Live Comments API' },
          ],
          concepts: [
            'RESTful API Architecture',
            'Prepared Statements / SQL Injection Prevention',
            'Relational Schema Normalization (3NF)',
            'Multi-Role Authentication & Session Guards',
          ],
        },
      },
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
              bnsp_assessment_forms: ['apl1', 'apl2', 'mma', 'mak2', 'mak4', 'mak5', 'mak7', 'banding'],
              skkni_standards: ['skema', 'unit', 'unitalias', 'elemen', 'subelemen (KUK)', 'syarat'],
              participants_and_execution: ['tuk', 'settanggal', 'tanggaltes', 'skemasiswa', 'unitsiswa', 'soal'],
              security_and_auth: ['users', 'lspuser_tbl', 'statuskerja'],
            },
          },
          tech_stack: ['PHP Native', 'MySQL', 'Tailwind CSS', 'JavaScript'],
        },
      },
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
              { name: 'Donasi', purpose: 'Transaksi Donasi Masuk', relations: 'N:1 Users & ProgramDonasi' },
              { name: 'Permohonan', purpose: 'Pengajuan Bantuan Dana', relations: 'N:1 Users & 1:1 Distribusi' },
              { name: 'Distribusi', purpose: 'Pencairan Dana Terverifikasi', relations: '1:1 Permohonan' },
            ],
          },
        },
      },
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
          database_connection: 'connected (MySQL 8.0, PostgreSQL, SQL Server)',
          timestamp: new Date().toISOString(),
        },
      },
    },
  ];

  const [activeEndpoint, setActiveEndpoint] = useState(endpoints[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseLog, setResponseLog] = useState(endpoints[0].response);
  const [latency, setLatency] = useState(36);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('body');

  const handleExecute = () => {
    setIsLoading(true);
    const simulatedLatency = Math.floor(Math.random() * 25) + 26;
    setTimeout(() => {
      setLatency(simulatedLatency);
      setResponseLog(activeEndpoint.response);
      setIsLoading(false);
    }, 240);
  };

  const handleSelectEndpoint = (ep) => {
    setActiveEndpoint(ep);
    setIsLoading(true);
    setTimeout(() => {
      setLatency(Math.floor(Math.random() * 20) + 28);
      setResponseLog(ep.response);
      setIsLoading(false);
    }, 180);
  };

  const handleCopy = () => {
    const textToCopy =
      activeTab === 'body'
        ? JSON.stringify(responseLog, null, 2)
        : `curl -X ${activeEndpoint.method} https://rafid-dev-portfolio.vercel.app${activeEndpoint.path} \\\n  -H "Accept: application/json"`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-playground" className="py-24 relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            Backend Developer Console
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">
            Interactive REST API Playground
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Uji coba langsung respon JSON mock dari arsitektur backend saya seperti menggunakan Postman atau Swagger.
          </p>
        </div>

        <div className="cosmic-card rounded-3xl overflow-hidden shadow-2xl">
          {/* Titlebar */}
          <div className="px-6 py-4 bg-[#080c20] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-blue-500/80"></span>
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
              <span className="font-mono text-xs text-slate-300 flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-blue-400" />
                <span>API Gateway Client v1.0</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-400/30 text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                HTTP 200 OK
              </span>
              <span className="text-slate-400">
                Latency: <span className="text-indigo-300 font-bold">{latency}ms</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Left Endpoint Selector */}
            <div className="lg:col-span-5 p-5 sm:p-6 space-y-2.5 bg-[#060919]/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Pilih Endpoint API
                </span>
                <span className="text-[11px] font-mono text-blue-400">{endpoints.length} Routes</span>
              </div>

              {endpoints.map((ep) => {
                const isSelected = activeEndpoint.id === ep.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => handleSelectEndpoint(ep)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.18)]'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            ep.method === 'GET'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                              : 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                          }`}
                        >
                          {ep.method}
                        </span>
                        <span className="font-mono text-xs font-semibold text-white">
                          {ep.path}
                        </span>
                      </div>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-blue-400"></span>}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{ep.desc}</p>
                  </button>
                );
              })}

              <div className="pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Respon disimulasikan sesuai standar RESTful API JSON.</span>
                </div>
              </div>
            </div>

            {/* Right JSON Viewer */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-[#040612]">
              <div className="p-5 border-b border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold ${
                      activeEndpoint.method === 'GET'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-400/40'
                    }`}
                  >
                    {activeEndpoint.method}
                  </span>

                  <div className="flex-1 px-4 py-2 rounded-xl bg-[#070a1c] border border-white/10 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto flex items-center">
                    <span className="text-slate-500 select-none">https://rafid-api.dev</span>
                    <span className="text-blue-300 font-semibold">{activeEndpoint.path}</span>
                  </div>

                  <button
                    onClick={handleExecute}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>{isLoading ? 'Fetching...' : 'Send'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <button
                      onClick={() => setActiveTab('body')}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        activeTab === 'body' ? 'bg-white/10 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Response JSON
                    </button>
                    <button
                      onClick={() => setActiveTab('curl')}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        activeTab === 'curl' ? 'bg-white/10 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      cURL Command
                    </button>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-blue-300 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-300">Copied!</span>
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

              <div className="p-5 font-mono text-xs overflow-x-auto flex-1 max-h-[380px]">
                {activeTab === 'body' ? (
                  <pre className="text-blue-200/90 leading-relaxed select-all">
                    {JSON.stringify(responseLog, null, 2)}
                  </pre>
                ) : (
                  <pre className="p-4 rounded-xl bg-[#070a1c] border border-white/10 text-indigo-300 leading-relaxed overflow-x-auto">
{`curl -X ${activeEndpoint.method} "https://rafid-dev-portfolio.vercel.app${activeEndpoint.path}" \\
  -H "Accept: application/json"`}
                  </pre>
                )}
              </div>

              <div className="px-5 py-3 border-t border-white/10 bg-[#070b1d] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
                <span>
                  Status: <strong className="text-blue-400">200 OK</strong> • Content-Type: <strong className="text-slate-300">application/json</strong>
                </span>
                <span>
                  Response Time: <strong className="text-indigo-300">{latency} ms</strong>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
