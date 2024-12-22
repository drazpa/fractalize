import React from 'react';
import { Slider } from '../Slider';
import { FractalSettings } from '../../types';
import { controlRanges } from '../../utils/fractalRanges';

interface ControlPanelProps {
  title: string;
  settings: FractalSettings;
  onSettingsChange: (settings: FractalSettings) => void;
  type: 'basic' | 'advanced';
}

export function ControlPanel({ title, settings, onSettingsChange, type }: ControlPanelProps) {
  const updateSetting = (key: keyof FractalSettings, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const controls = Object.entries(controlRanges);
  const midpoint = Math.floor(controls.length / 2);
  const panelControls = type === 'basic' ? controls.slice(0, midpoint) : controls.slice(midpoint);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
      <div className="space-y-1 custom-scrollbar">
        {panelControls.map(([key, range]) => (
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