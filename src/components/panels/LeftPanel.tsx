import React from 'react';
import { Slider } from '../Slider';
import { FractalSettings } from '../../types';
import { controlRanges } from '../../utils/fractalRanges';

interface LeftPanelProps {
  settings: FractalSettings;
  onSettingsChange: (settings: FractalSettings) => void;
}

export function LeftPanel({ settings, onSettingsChange }: LeftPanelProps) {
  const updateSetting = (key: keyof FractalSettings, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const leftControls = Object.entries(controlRanges).slice(0, Object.keys(controlRanges).length / 2);

  return (
    <div className="w-80 bg-background-secondary p-4 overflow-y-auto border-r border-background-tertiary">
      <h2 className="text-lg font-bold text-white mb-4">Basic Controls</h2>
      <div className="space-y-1">
        {leftControls.map(([key, range]) => (
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