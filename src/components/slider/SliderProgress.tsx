import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface SliderProgressProps {
  min: number;
  max: number;
  currentValue: number;
  targetValue: number;
  progress: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}

export function SliderProgress({
  min,
  max,
  currentValue,
  targetValue,
  progress,
  isPlaying,
  onPlayPause,
  onReset
}: SliderProgressProps) {
  const range = max - min;
  const startPercent = ((currentValue - min) / range) * 100;
  const endPercent = ((targetValue - min) / range) * 100;
  
  return (
    <div className="mt-1">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={onPlayPause}
            className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-white"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={onReset}
            className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-white"
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="text-xs text-gray-400">
          {Math.round(progress * 100)}%
        </div>
      </div>
      <div className="h-1 bg-gray-700 rounded-full relative">
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
        <div 
          className="absolute h-full bg-yellow-500 rounded-full transition-all duration-300"
          style={{ 
            left: '0%',
            width: `${progress * 100}%`,
            opacity: 0.2
          }}
        />
      </div>
    </div>
  );
}