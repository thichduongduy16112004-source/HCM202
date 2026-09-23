import { useState, useEffect, useRef, useCallback } from 'react';
import { SectionId } from '@/types';
import { presentationSections } from '@/data/presentation';

export const usePresenterMode = (
  activeSection: SectionId,
  scrollToSection: (id: SectionId) => void
) => {
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const userInterruptedRef = useRef(false);

  const currentSection = presentationSections.find(s => s.id === activeSection) || presentationSections[0];
  const currentIndex = presentationSections.findIndex(s => s.id === activeSection);

  // Reset timer on section change
  useEffect(() => {
    if (currentSection) {
      setTimeRemaining(currentSection.presentationDuration);
    }
  }, [activeSection, currentSection]);

  const goToNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % presentationSections.length;
    scrollToSection(presentationSections[nextIdx].id);
  }, [currentIndex, scrollToSection]);

  const goToPrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + presentationSections.length) % presentationSections.length;
    scrollToSection(presentationSections[prevIdx].id);
  }, [currentIndex, scrollToSection]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const togglePresenter = useCallback(() => {
    setIsActive(prev => {
      const next = !prev;
      if (next) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
      return next;
    });
  }, []);

  // Timer tick effect
  useEffect(() => {
    if (!isActive || !isPlaying) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          goToNext();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPlaying, goToNext]);

  // Pause auto-presentation temporarily if user manually scrolls or interacts
  useEffect(() => {
    if (!isActive) return;

    const handleUserInteraction = (e: Event) => {
      // Ignore if user clicks within presenter controls
      const target = e.target as HTMLElement;
      if (target.closest('.presenter-controls')) return;

      if (isPlaying && !userInterruptedRef.current) {
        setIsPlaying(false);
        userInterruptedRef.current = true;
        // Resume after 8 seconds of inactivity if desired
        setTimeout(() => {
          userInterruptedRef.current = false;
        }, 8000);
      }
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
    };
  }, [isActive, isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsActive(false);
        setIsPlaying(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, togglePlay, goToNext, goToPrev]);

  return {
    isActive,
    isPlaying,
    currentSection,
    currentIndex,
    timeRemaining,
    togglePresenter,
    togglePlay,
    goToNext,
    goToPrev,
    setIsActive,
  };
};
