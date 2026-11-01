import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Copy, Check, CornerDownLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TerminalWidget() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: '⚡ Rafid OS [Version 2.4.0-backend]',
    },
    {
      type: 'system',
      text: 'Type "help" or click quick chips below to run commands.',
    },
    {
      type: 'prompt',
      cmd: 'whoami',
    },
    {
      type: 'output',
      text: 'Rafid Muzakki Putra Andryan • Backend Developer (Laravel / PHP / SQL)',
    },
  ]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const rawCmd = (cmdStr || input).trim();
    if (!rawCmd) return;

    const parts = rawCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const newHistory = [...history, { type: 'prompt', cmd: rawCmd }];

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:
  • about       - Profile & introduction
  • skills      - Tech stack & proficiency
  • projects    - Featured backend & desktop works
  • education   - School & certification journey
  • contact     - Social links & discord
  • clear       - Clear terminal screen
  • matrix      - Secret hacker fireworks
  • sudo        - Superuser test`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `Rafid Muzakki Putra Andryan (Rafid)
Location : Cibinong, Bogor, Jawa Barat
Status   : Pelajar SMKN 1 Cibinong (RPL / IT)
Passions : Backend Engineering, RESTful APIs, Database Design, Scalable Systems.`,
        });
        break;

      case 'skills':
      case 'stack':
        newHistory.push({
          type: 'output',
          text: `[Backend & Web] : PHP, Laravel, HTML5, CSS3, JavaScript (OOP / Explore), Tailwind CSS
[Databases]     : PostgreSQL, MySQL, Supabase (Exploring)
[Desktop/Game]  : C#, Game Logic (Advenland)
[Tools]         : Git, GitHub, VS Code, REST API, Postman`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. Aplikasi LSP SMKN 1 Cibinong (Web / PHP Native / MySQL)
   -> https://github.com/muzakkirafid18-bit/LSP_Tes
2. Game Advenland (Game Project / Logic & Gameplay)
3. Aplikasi Donasi Berbasis Desktop (C# .NET)`,
        });
        break;

      case 'education':
      case 'cert':
        newHistory.push({
          type: 'output',
          text: `Schools:
  • SMKN 1 Cibinong (Current)
  • SMPN 4 Cibinong
  • SDN Pabuaran 07
Certificates:
  • Dicoding Certificate (Foundation)
  • 2x Sertifikasi BNSP (Target: Bulan Ini!)`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `GitHub   : https://github.com/muzakkirafid18-bit
LinkedIn : https://www.linkedin.com/in/rafid-muzakki-1069733a8/
Instagram: @812.raf
Discord  : rafid_muzakki_40241`,
        });
        break;

      case 'matrix':
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#3b82f6'],
        });
        newHistory.push({
          type: 'output',
          text: '🟢 MATRIX MODE ACTIVATED: System performance optimal [100%].',
        });
        break;

      case 'sudo':
        newHistory.push({
          type: 'error',
          text: 'Permission denied: Rafid has root access to all server routines. 🔐',
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${command}". Type "help" for a list of commands.`,
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleCopyHistory = () => {
    const textToCopy = history
      .map((item) => (item.type === 'prompt' ? `$ ${item.cmd}` : item.text))
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickChips = ['help', 'about', 'skills', 'projects', 'education', 'contact', 'matrix'];

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#060813]/90 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.7)] text-xs sm:text-sm font-mono flex flex-col transition-all duration-300 hover:border-emerald-500/50">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-[#0d1222]/90 border-b border-emerald-500/20 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:opacity-100 cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block hover:opacity-100 cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block hover:opacity-100 cursor-pointer"></span>
          </div>
          <span className="text-slate-400 text-xs ml-2 flex items-center gap-1.5 font-medium">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            rafid@cibinong-srv: ~ (bash)
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <button
            onClick={handleCopyHistory}
            className="p-1 rounded hover:text-emerald-400 hover:bg-slate-800 transition-colors"
            title="Copy terminal log"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        className="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto space-y-2.5 text-slate-300 leading-relaxed custom-scrollbar cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="break-words">
            {item.type === 'system' && (
              <p className="text-slate-500 italic text-[11px] sm:text-xs">{item.text}</p>
            )}
            {item.type === 'prompt' && (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="text-slate-500">➜</span>
                <span className="text-cyan-400">~/rafid</span>
                <span className="text-emerald-400">$</span>
                <span className="text-slate-100">{item.cmd}</span>
              </div>
            )}
            {item.type === 'output' && (
              <pre className="text-slate-300 whitespace-pre-wrap font-mono pl-4 border-l-2 border-emerald-500/30 text-[11px] sm:text-xs">
                {item.text}
              </pre>
            )}
            {item.type === 'error' && (
              <p className="text-rose-400 pl-4 border-l-2 border-rose-500/40 text-[11px] sm:text-xs">
                {item.text}
              </p>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Input Line */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(input);
        }}
        className="px-4 py-3 bg-[#080d1a] border-t border-emerald-500/20 flex items-center gap-2"
      >
        <span className="text-emerald-400 font-bold">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'help', 'skills', 'projects'..."
          className="flex-1 bg-transparent text-emerald-300 outline-none font-mono text-xs sm:text-sm placeholder:text-slate-600"
        />
        <button
          type="submit"
          className="text-slate-500 hover:text-emerald-400 transition-colors"
          title="Run command"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Interactive Command Chips */}
      <div className="px-4 py-2.5 bg-[#050811] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[10px] sm:text-xs text-slate-400 select-none">
        <span className="text-slate-500 mr-1 shrink-0">Quick run:</span>
        {quickChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleCommand(chip)}
            className="px-2 py-0.5 rounded bg-slate-800/60 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40 border border-slate-700/60 transition-all shrink-0 active:scale-95"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
