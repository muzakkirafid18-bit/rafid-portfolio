# 🚀 Portofolio Developer - Rafid Muzakki Putra Andryan

Website portofolio developer modern bertema **Dark Cyber / Hacker Aesthetic** dengan animasi interaktif, terminal bash yang dapat diketik langsung di browser, dan efek partikel canvas.

---

## ⚡ Fitur Utama
- **Dark Hacker Theme:** Aksen emerald neon, font monospace JetBrains Mono, glassmorphism card, dan scanlines.
- **Interactive Bash Terminal:** Pengunjung bisa mengetikkan perintah (`help`, `skills`, `projects`, `education`, `contact`, `matrix`, `clear`).
- **Canvas Particle Constellation:** Partikel interaktif di background yang bereaksi terhadap kursor mouse.
- **Showcase Proyek:**
  - Aplikasi LSP SMKN 1 Cibinong (Laravel, PHP, MySQL, Tailwind)
  - Game Advenland
  - Aplikasi Donasi Berbasis Desktop (C# .NET)
- **Timeline Pendidikan & Sertifikasi:** Riwayat sekolah dan persiapan 2x Sertifikasi BNSP.
- **1-Click Copy Discord & Confetti:** Interaksi klik dengan efek confetti perayaan.
- **100% Responsive:** Tampilan optimal di HP, tablet, maupun layar PC/laptop.

---

## 🛠️ Menjalankan di Lokal (Laptop Sendiri)

1. Pastikan Node.js sudah terpasang.
2. Buka terminal di folder project ini:
   ```bash
   npm run dev
   ```
3. Buka browser di `http://localhost:5173/`

---

## 🌐 Cara Hosting Gratis ke Vercel (Subdomain rafid.vercel.app)

Ada 2 cara paling mudah:

### Cara 1: Lewat GitHub (Sangat Direkomendasikan & Otomatis Update)
1. Buat repository baru di GitHub kamu ([https://github.com/new](https://github.com/new)), beri nama misalnya `portfolio` atau `rafid-portfolio`.
2. Push kodingan ini ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial developer portfolio"
   git branch -M main
   git remote add origin https://github.com/muzakkirafid18-bit/portfolio.git
   git push -u origin main
   ```
3. Buka [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub kamu.
4. Klik tombol **"Add New..."** -> **"Project"**.
5. Pilih repository `portfolio` kamu, lalu klik **"Import"**.
6. Framework preset akan otomatis terdeteksi sebagai **Vite**. Langsung klik tombol **"Deploy"**!
7. Tunggu sekitar 15–30 detik, website kamu sudah langsung live di internet!

#### Mengatur Subdomain `rafid.vercel.app`:
1. Masuk ke dashboard project kamu di Vercel.
2. Buka menu **Settings** > **Domains**.
3. Di kotak domain, ketik `rafid.vercel.app` (atau variasi jika nama sudah pernah dipakai orang lain, seperti `rafid-dev.vercel.app` atau `rafidmuzakki.vercel.app`), lalu klik **Add**.
4. Selesai! Siapapun di seluruh dunia sudah bisa membuka website kamu.

---

### Cara 2: Lewat Vercel CLI Langsung dari Terminal
Jika tidak ingin lewat GitHub:
```bash
npm install -g vercel
vercel
```
Ikuti instruksi login di layar dan pilih opsi default `Y` untuk langsung deploy.

---

## 📁 Struktur File Penting
- `src/components/Hero.jsx`: Judul, biodata, dan animasi role typing.
- `src/components/TerminalWidget.jsx`: Terminal interaktif yang bisa diketik perintah.
- `src/components/SkillsSection.jsx`: Daftar teknologi dan framework.
- `src/components/ProjectsSection.jsx`: Kartu proyek dan modal detail specs.
- `src/components/EducationTimeline.jsx`: Riwayat sekolah & sertifikat.
- `src/components/ContactSection.jsx`: Sosial media dan form pesan.
- `src/components/Icons.jsx`: Ikon SVG GitHub, LinkedIn, Instagram, Discord.
- `public/`: Simpan file foto diri / sertifikat asli jika ingin ditampilkan.
