import { useEffect, useRef } from 'react';

interface AnimationConfig {
  duration: number;
  easing?: (t: number) => number;
  onProgress?: (progress: number) => void;
  isPlaying?: boolean;
  loop?: boolean;
}

const defaultEasing = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export function useSliderAnimation(
  currentValue: number,
  targetValue: number,
  onChange: (value: number) => void,
  config: AnimationConfig
) {
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const startValueRef = useRef<number>();
  const pausedProgressRef = useRef<number>(0);

  const { duration, easing = defaultEasing, onProgress, isPlaying = true, loop = false } = config;

  useEffect(() => {
    if (!isPlaying || currentValue === targetValue) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      return;
    }

    if (!startTimeRef.current) {
      startValueRef.current = currentValue;
      startTimeRef.current = performance.now() - (pausedProgressRef.current * duration);
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current || !startValueRef.current) return;

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      const newValue = startValueRef.current + (targetValue - startValueRef.current) * easedProgress;
      onChange(newValue);
      onProgress?.(progress);
      pausedProgressRef.current = progress;

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else if (loop) {
        // Reset animation for looping
        startTimeRef.current = currentTime;
        startValueRef.current = currentValue;
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [currentValue, targetValue, duration, easing, onChange, onProgress, isPlaying, loop]);

  const reset = () => {
    startTimeRef.current = undefined;
    pausedProgressRef.current = 0;
    if (startValueRef.current !== undefined) {
      onChange(startValueRef.current);
    }
    onProgress?.(0);
  };

  return { reset };
}