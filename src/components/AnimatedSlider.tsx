import React, { useState, useCallback } from 'react';
import { useSliderAnimation } from '../hooks/useSliderAnimation';
import { Clock } from 'lucide-react';

interface AnimatedSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
}

export function AnimatedSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue = (v) => v.toFixed(2)
}: AnimatedSliderProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [duration, setDuration] = useState(1000);
  const [animationProgress, setAnimationProgress] = useState(1);

  const handleProgress = useCallback((progress: number) => {
    setAnimationProgress(progress);
  }, []);

  useSliderAnimation(displayValue, value, setDisplayValue, {
    duration,
    onProgress: handleProgress
  });

  const range = max - min;
  const startPercent = ((displayValue - min) / range) * 100;
  const endPercent = ((value - min) / range) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-200">
          {label}: {formatValue(displayValue)}
        </label>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-gray-400" />
          {[
            { label: '0.5x', value: 2000 },
            { label: '1x', value: 1000 },
            { label: '2x', value: 500 },
            { label: '4x', value: 250 }
          ].map((speed) => (
            <button
              key={speed.value}
              onClick={() => setDuration(speed.value)}
              className={`px-2 py-0.5 text-xs rounded ${
                duration === speed.value 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {speed.label}
            </button>
          ))}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={displayValue}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer"
      />
      <div className="h-1 bg-gray-700 rounded-full mt-1 relative">
        <div 
          className="absolute h-full bg-blue-500 opacity-30 rounded-full transition-all duration-300"
          style={{ 
            left: `${Math.min(startPercent, endPercent)}%`,
            right: `${100 - Math.max(startPercent, endPercent)}%`
          }}
        />
        <div 
          className="absolute h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ 
            left: `${startPercent}%`,
            width: '2px'
          }}
        />
        <div 
          className="absolute h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ 
            left: `${endPercent}%`,
            width: '2px'
          }}
        />
      </div>
    </div>
  );
}