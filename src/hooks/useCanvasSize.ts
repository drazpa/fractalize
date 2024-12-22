import { useEffect, useRef } from 'react';

export function useCanvasSize(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  gl: WebGLRenderingContext | null
) {
  const resizeObserverRef = useRef<ResizeObserver>();

  useEffect(() => {
    if (!canvasRef.current || !gl) return;

    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Get the device pixel ratio
      const pixelRatio = window.devicePixelRatio || 1;
      
      // Get the size of the canvas in CSS pixels
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Calculate the size needed to make the canvas look crisp
      const displayWidth = Math.round(width * pixelRatio);
      const displayHeight = Math.round(height * pixelRatio);

      // Check if the canvas is already the right size
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    };

    // Use ResizeObserver for more efficient size tracking
    resizeObserverRef.current = new ResizeObserver(updateSize);
    resizeObserverRef.current.observe(canvasRef.current);

    // Initial size update
    updateSize();

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [gl, canvasRef]);
}