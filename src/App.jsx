import CosmicBackground from './components/CosmicBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import SpotifySection from './components/SpotifySection';
import PortfolioSection from './components/PortfolioSection';
import ApiPlayground from './components/ApiPlayground';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050510] text-slate-200 selection:bg-blue-500 selection:text-white">
      {/* Dark Cosmic Starfield, Shooting Stars & Planet Silhouettes */}
      <CosmicBackground />

      {/* Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <AboutSection />
          <ExperienceSection />
          <SpotifySection />
          <PortfolioSection />
          <ApiPlayground />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
