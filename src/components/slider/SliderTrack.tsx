import React from 'react';

interface SliderTrackProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  startValue: number;
  endValue: number;
  progress: number;
}

export function SliderTrack({
  min,
  max,
  step,
  value,
  onChange,
  startValue,
  endValue,
  progress
}: SliderTrackProps) {
  const range = max - min;
  const startPercent = ((startValue - min) / range) * 100;
  const endPercent = ((endValue - min) / range) * 100;
  const currentPercent = ((value - min) / range) * 100;

  return (
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer relative z-10"
      />
      <div className="absolute inset-0 pointer-events-none">
        {/* Animation range indicator */}
        <div 
          className="absolute h-full bg-blue-500/20 rounded-full transition-all duration-300"
          style={{ 
            left: `${Math.min(startPercent, endPercent)}%`,
            right: `${100 - Math.max(startPercent, endPercent)}%`
          }}
        />
        
        {/* Start marker */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
          <div 
            className="h-4 w-1 bg-blue-500 rounded-full"
            style={{ left: `${startPercent}%` }}
          />
          <div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-blue-400"
            style={{ left: `${startPercent}%` }}
          >
            Start
          </div>
        </div>

        {/* End marker */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
          <div 
            className="h-4 w-1 bg-green-500 rounded-full"
            style={{ left: `${endPercent}%` }}
          />
          <div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-green-400"
            style={{ left: `${endPercent}%` }}
          >
            End
          </div>
        </div>

        {/* Progress indicator */}
        <div 
          className="absolute h-full bg-yellow-500/30 rounded-full transition-all duration-100"
          style={{ 
            left: `${startPercent}%`,
            width: `${(endPercent - startPercent) * progress}%`
          }}
        />
      </div>
    </div>
  );
}