import React from 'react';
import { Shuffle } from 'lucide-react';
import { Slider } from './Slider';
import { FractalSettings } from '../types';
import { randomizeStyle } from '../utils/fractalStyles';
import { controlRanges } from '../utils/fractalRanges';

interface FractalControlsProps {
  settings: FractalSettings;
  onSettingsChange: (settings: FractalSettings) => void;
}

export function FractalControls({
  settings,
  onSettingsChange
}: FractalControlsProps) {
  const updateSetting = (key: keyof FractalSettings, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Fractal Controls</h2>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((style) => (
            <button
              key={style}
              onClick={() => onSettingsChange(randomizeStyle(style))}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Shuffle size={20} />
              Style {style}
            </button>
          ))}
          {Array.from({ length: 27 }, (_, i) => i + 4).map((style) => (
            <button
              key={style}
              onClick={() => onSettingsChange(randomizeStyle(style))}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Shuffle size={20} />
              Random {style - 3}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto p-4">
        {Object.entries(controlRanges).map(([key, range]) => (
          <Slider
            key={key}
            label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            value={settings[key as keyof FractalSettings]}
            onChange={(value) => updateSetting(key as keyof FractalSettings, value)}
            min={range.min}
            max={range.max}
            step={range.step}
            formatValue={Number.isInteger(range.step) ? Math.round : (v) => v.toFixed(2)}
          />
        ))}
      </div>
    </div>
  );
}