import React from 'react';
import { Save, Play } from 'lucide-react';
import { FractalSettings } from '../types';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface PresetButtonsProps {
  onLoadPreset: (settings: FractalSettings) => void;
  currentSettings: FractalSettings;
}

export function PresetButtons({ onLoadPreset, currentSettings }: PresetButtonsProps) {
  const loadPreset = (index: number) => {
    const preset = localStorage.getItem(`fractal-preset-${index}`);
    if (preset) {
      onLoadPreset(JSON.parse(preset));
    }
  };

  const savePreset = (index: number) => {
    localStorage.setItem(`fractal-preset-${index}`, JSON.stringify(currentSettings));
  };

  useKeyboardShortcuts(onLoadPreset, savePreset);

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex gap-0.5">
            <button
              onClick={() => loadPreset(i + 1)}
              className="flex-1 flex items-center justify-center gap-0.5 px-1.5 py-0.5 bg-blue-600 text-white rounded-l hover:bg-blue-700 transition-colors text-xs"
              title={`Load Preset ${i + 1} (Press ${i + 1})`}
            >
              <Play size={10} />
              {i + 1}
            </button>
            <button
              onClick={() => savePreset(i + 1)}
              className="px-1.5 py-0.5 bg-green-600 text-white rounded-r hover:bg-green-700 transition-colors"
              title={`Save to Preset ${i + 1} (Press Shift + ${i + 1})`}
            >
              <Save size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}