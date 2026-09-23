import { useState, useEffect } from 'react';
import { SectionId } from '@/types';
import { presentationSections } from '@/data/presentation';

export const useSectionObserver = (): {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
} => {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  useEffect(() => {
    const sectionElements = presentationSections
      .map(s => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return { activeSection, scrollToSection };
};
