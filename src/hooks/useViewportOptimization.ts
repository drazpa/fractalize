import { useState, useEffect } from 'react';

interface ViewportState {
  isVisible: boolean;
  isReducedMotion: boolean;
}

export function useViewportOptimization(): ViewportState {
  const [state, setState] = useState<ViewportState>({
    isVisible: true,
    isReducedMotion: false
  });

  useEffect(() => {
    // Check if reduced motion is preferred
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setState(prev => ({ ...prev, isReducedMotion: mediaQuery.matches }));

    const handleMotionPreference = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, isReducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handleMotionPreference);

    // Use Intersection Observer to detect visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setState(prev => ({ ...prev, isVisible: entry.isIntersecting }));
        });
      },
      { threshold: 0.1 }
    );

    const canvas = document.querySelector('canvas');
    if (canvas) {
      observer.observe(canvas);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreference);
      observer.disconnect();
    };
  }, []);

  return state;
}