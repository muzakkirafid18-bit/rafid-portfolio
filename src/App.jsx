import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import EducationTimeline from './components/EducationTimeline';
import ApiPlayground from './components/ApiPlayground';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#05070e] text-slate-200 selection:bg-emerald-500 selection:text-black">
      {/* Interactive Particle Background */}
      <ParticleBackground />

      {/* Cyber Grid Lines overlay */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40"></div>

      {/* Subtle top ambient radial lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 blur-[140px] pointer-events-none -z-10 rounded-full"></div>
      <div className="fixed top-1/3 -left-48 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] pointer-events-none -z-10 rounded-full"></div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <SkillsSection />
          <ProjectsSection />
          <EducationTimeline />
          <ApiPlayground />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
