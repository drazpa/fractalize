import React from 'react';
import { Shuffle, Waves, Sparkles, Zap, Star, Flame } from 'lucide-react';
import { FractalSettings } from '../types';
import { randomizeStyle } from '../utils/fractalStyles';

interface StyleButtonsProps {
  onSettingsChange: (settings: FractalSettings) => void;
}

export function StyleButtons({ onSettingsChange }: StyleButtonsProps) {
  const handleStyleChange = (style: number) => {
    const newSettings = randomizeStyle(style);
    onSettingsChange(newSettings);
  };

  const presets = [
    { id: 1, icon: Sparkles, label: 'Crystal' },
    { id: 2, icon: Flame, label: 'Plasma' },
    { id: 3, icon: Star, label: 'Nova' },
    { id: 4, icon: Waves, label: 'Wave' },
    { id: 5, icon: Zap, label: 'Energy' }
  ];

  const randomStyles = Array.from({ length: 8 }, (_, i) => ({
    id: i + 6,
    icon: Shuffle,
    label: `Random ${i + 1}`
  }));

  return (
    <div className="flex flex-wrap gap-1">
      {presets.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => handleStyleChange(id)}
          className="flex items-center gap-1 px-2 py-1 bg-background-tertiary text-white rounded hover:bg-gray-800 transition-colors text-xs"
          title={label}
        >
          <Icon size={12} />
          <span>{label}</span>
        </button>
      ))}
      {randomStyles.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => handleStyleChange(id)}
          className="flex items-center gap-1 px-2 py-1 bg-background-tertiary text-white rounded hover:bg-gray-800 transition-colors text-xs"
          title={label}
        >
          <Icon size={12} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}