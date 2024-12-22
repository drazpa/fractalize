import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue = (v) => v.toFixed(2)
}: SliderProps) {
  return (
    <div className="mb-2 w-full bg-background-tertiary/30 p-2 rounded">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-24 truncate">
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-sm font-medium">{formatValue(value)}</div>
        </div>
        
        <div className="flex-1">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}