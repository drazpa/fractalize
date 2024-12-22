import React from 'react';
import { Clock } from 'lucide-react';

interface SpeedControlsProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

export function SpeedControls({ duration, onDurationChange }: SpeedControlsProps) {
  const speeds = [
    { label: '0.5x', value: 2000 },
    { label: '1x', value: 1000 },
    { label: '2x', value: 500 },
    { label: '4x', value: 250 }
  ];

  return (
    <div className="flex items-center gap-2">
      <Clock size={14} className="text-gray-400" />
      {speeds.map((speed) => (
        <button
          key={speed.value}
          onClick={() => onDurationChange(speed.value)}
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
  );
}