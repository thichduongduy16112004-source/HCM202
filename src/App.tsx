import React, { useState } from 'react';
import { SectionId, HistoricalImage } from '@/types';
import { historicalImages } from '@/data/images';
import { useSectionObserver } from '@/hooks/useSectionObserver';
import { usePresenterMode } from '@/hooks/usePresenterMode';

// Common Components
import { Navbar } from '@/components/common/Navbar';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { Lightbox } from '@/components/archive/Lightbox';
import { SourceDrawer } from '@/components/evidence/SourceDrawer';
import { PresenterControls } from '@/components/presenter/PresenterControls';
import { SceneTransition } from '@/components/common/SceneTransition';

// All 9 scenes
import { HeroSection } from '@/sections/HeroSection/HeroSection';
import { IndependenceSection } from '@/sections/IndependenceSection/IndependenceSection';
import { ArchiveSection } from '@/sections/ArchiveSection/ArchiveSection';
import { SocialismSection } from '@/sections/SocialismSection/SocialismSection';
import { ConditionsSection } from '@/sections/ConditionsSection/ConditionsSection';
import { DebateSection } from '@/sections/DebateSection/DebateSection';
import { LimitationsSection } from '@/sections/LimitationsSection/LimitationsSection';
import { ConclusionSection } from '@/sections/ConclusionSection/ConclusionSection';
import { SourcesSection } from '@/sections/SourcesSection/SourcesSection';
import { Footer } from '@/sections/Footer/Footer';

export const App: React.FC = () => {
  const { activeSection, scrollToSection } = useSectionObserver();

  // Presenter Mode Hook
  const {
    isActive: isPresenterActive,
    isPlaying: isPresenterPlaying,
    timeRemaining,
    togglePresenter,
    togglePlay,
    goToNext,
    goToPrev,
    setIsActive: setIsPresenterActive,
  } = usePresenterMode(activeSection, scrollToSection);

  // Lightbox State
  const [activeLightboxImage, setActiveLightboxImage] = useState<HistoricalImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Source Drawer State
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [isSourceDrawerOpen, setIsSourceDrawerOpen] = useState(false);

  // Image actions
  const handleOpenImage = (image: HistoricalImage) => {
    setActiveLightboxImage(image);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Source actions
  const handleOpenSource = (sourceId: string) => {
    setActiveSourceId(sourceId);
    setIsSourceDrawerOpen(true);
  };

  const handleOpenAllSources = () => {
    setActiveSourceId(null);
    setIsSourceDrawerOpen(true);
  };

  const handleCloseSourceDrawer = () => {
    setIsSourceDrawerOpen(false);
  };

  const heroImage = historicalImages.find((image) => image.id === 'image-bac-doc-tuyen-ngon-1945') || historicalImages[0];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] relative">
      <a href="#main-content" className="fixed left-4 top-3 z-[100] -translate-y-20 rounded bg-[var(--color-dark-bg)] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0">
        Bỏ qua điều hướng
      </a>

      {/* Top Thin Progress Bar */}
      <ScrollProgress />

      {/* Main Header Navbar */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        onOpenSources={handleOpenAllSources}
        onTogglePresenter={togglePresenter}
        isPresenterActive={isPresenterActive}
      />

      {/* Main Content Area: 9 Sequential Academic Scenes */}
      <main id="main-content" className="flex-1">
        <SceneTransition><HeroSection heroImage={heroImage} onExplore={() => scrollToSection('independence')} onOpenImage={handleOpenImage} /></SceneTransition>
        <SceneTransition><IndependenceSection onOpenSource={handleOpenSource} onOpenImage={handleOpenImage} /></SceneTransition>
        <SceneTransition><ArchiveSection onSelectImage={handleOpenImage} /></SceneTransition>
        <SceneTransition><SocialismSection onOpenSource={handleOpenSource} onOpenImage={handleOpenImage} /></SceneTransition>
        <SceneTransition><ConclusionSection onOpenSource={handleOpenSource} /></SceneTransition>
        <SceneTransition><ConditionsSection onOpenSource={handleOpenSource} /></SceneTransition>
        <SceneTransition><DebateSection onOpenSource={handleOpenSource} /></SceneTransition>
        <SceneTransition><LimitationsSection /></SceneTransition>
        <SceneTransition><SourcesSection onOpenSource={handleOpenSource} /></SceneTransition>

      </main>

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal */}
      <Lightbox
        image={activeLightboxImage}
        images={historicalImages}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        onSelectImage={setActiveLightboxImage}
      />

      {/* Source Reference Drawer */}
      <SourceDrawer
        sourceId={activeSourceId}
        isOpen={isSourceDrawerOpen}
        onClose={handleCloseSourceDrawer}
      />

      {/* Floating Presenter Mode Controls */}
      <PresenterControls
        isActive={isPresenterActive}
        isPlaying={isPresenterPlaying}
        activeSection={activeSection}
        timeRemaining={timeRemaining}
        onTogglePlay={togglePlay}
        onNext={goToNext}
        onPrev={goToPrev}
        onExit={() => setIsPresenterActive(false)}
        onSelectSection={scrollToSection}
      />

    </div>
  );
};
