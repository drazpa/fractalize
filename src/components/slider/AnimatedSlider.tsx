import React, { useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Repeat } from 'lucide-react';
import { useSliderAnimation } from '../../hooks/useSliderAnimation';
import { RangeSlider } from './RangeSlider';
import { SpeedControls } from './SpeedControls';

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
  const [startPoint, setStartPoint] = useState(value);
  const [endPoint, setEndPoint] = useState(value);
  const [duration, setDuration] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback((p: number) => {
    setProgress(p);
    if (p >= 1 && isLooping) {
      setDisplayValue(startPoint);
      setProgress(0);
    }
  }, [isLooping, startPoint]);

  const { reset } = useSliderAnimation(
    isPlaying ? startPoint : displayValue,
    isPlaying ? endPoint : value,
    setDisplayValue,
    {
      duration,
      onProgress: handleProgress,
      isPlaying,
      loop: isLooping
    }
  );

  const handlePlayPause = () => {
    if (!isPlaying) {
      setStartPoint(displayValue);
      setEndPoint(value);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    reset();
    setIsPlaying(false);
    setProgress(0);
    setDisplayValue(startPoint);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  return (
    <div className="mb-2 w-full bg-background-tertiary/30 p-2 rounded">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-24 truncate">
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-sm font-medium">{formatValue(displayValue)}</div>
        </div>
        
        <div className="flex-1">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={displayValue}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              setDisplayValue(newValue);
              if (!isPlaying) {
                onChange(newValue);
              }
            }}
            className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePlayPause}
            className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-white"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-white"
            title="Reset"
          >
            <RotateCcw size={12} />
          </button>
          <button
            onClick={toggleLoop}
            className={`p-1 rounded ${
              isLooping 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            } text-white`}
            title={isLooping ? 'Disable Loop' : 'Enable Loop'}
          >
            <Repeat size={12} />
          </button>
        </div>
      </div>

      <RangeSlider
        min={min}
        max={max}
        value={displayValue}
        onChange={setDisplayValue}
        startPoint={startPoint}
        endPoint={endPoint}
        onStartPointChange={setStartPoint}
        onEndPointChange={setEndPoint}
      />

      <div className="flex justify-between items-center mt-1">
        <SpeedControls duration={duration} onDurationChange={setDuration} />
        <div className="text-xs text-gray-400">
          {Math.round(progress * 100)}%
        </div>
      </div>
    </div>
  );
}