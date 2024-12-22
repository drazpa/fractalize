import { useEffect } from 'react';
import { FractalSettings } from '../types';

export function useKeyboardShortcuts(
  onLoadPreset: (settings: FractalSettings) => void,
  onSavePreset: (index: number) => void
) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if no input elements are focused
      if (document.activeElement?.tagName === 'INPUT') return;

      const key = e.key;
      const isNumber = /^[1-8]$/.test(key);

      if (isNumber) {
        const presetIndex = parseInt(key);
        if (e.shiftKey) {
          // Shift + number saves preset
          onSavePreset(presetIndex);
        } else {
          // Number alone loads preset
          const preset = localStorage.getItem(`fractal-preset-${presetIndex}`);
          if (preset) {
            onLoadPreset(JSON.parse(preset));
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onLoadPreset, onSavePreset]);
}