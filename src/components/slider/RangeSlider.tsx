import React, { useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  onStartPointChange: (value: number) => void;
  onEndPointChange: (value: number) => void;
  startPoint: number;
  endPoint: number;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  onStartPointChange,
  onEndPointChange,
  startPoint,
  endPoint
}: RangeSliderProps) {
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);

  const range = max - min;
  const startPercent = ((startPoint - min) / range) * 100;
  const endPercent = ((endPoint - min) / range) * 100;

  return (
    <div className="relative h-8 mt-1">
      {/* Main slider track */}
      <div className="absolute inset-x-0 top-3 h-2 bg-gray-700 rounded-full">
        {/* Animation range */}
        <div 
          className="absolute h-full bg-blue-500/20 rounded-full"
          style={{ 
            left: `${Math.min(startPercent, endPercent)}%`,
            right: `${100 - Math.max(startPercent, endPercent)}%`
          }}
        />
      </div>

      {/* Start point handle */}
      <div 
        className="absolute top-2 -ml-2 cursor-pointer"
        style={{ left: `${startPercent}%` }}
        onMouseDown={() => setIsDraggingStart(true)}
      >
        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg" />
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-blue-400">
          Start
        </div>
      </div>

      {/* End point handle */}
      <div 
        className="absolute top-2 -ml-2 cursor-pointer"
        style={{ left: `${endPercent}%` }}
        onMouseDown={() => setIsDraggingEnd(true)}
      >
        <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg" />
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-green-400">
          End
        </div>
      </div>

      {/* Invisible range inputs for better touch/mouse control */}
      <input
        type="range"
        min={min}
        max={max}
        value={startPoint}
        onChange={(e) => onStartPointChange(parseFloat(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
        style={{ display: isDraggingStart ? 'block' : 'none' }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={endPoint}
        onChange={(e) => onEndPointChange(parseFloat(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
        style={{ display: isDraggingEnd ? 'block' : 'none' }}
      />
    </div>
  );
}