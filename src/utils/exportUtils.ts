import { saveAs } from 'file-saver';

export async function exportImage(canvas: HTMLCanvasElement | null, format: 'png' | 'jpg' = 'png') {
  if (!canvas) return;
  
  // Create a temporary canvas for the export
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = canvas.width * 2; // 2x resolution
  exportCanvas.height = canvas.height * 2;
  
  const ctx = exportCanvas.getContext('2d');
  if (!ctx) return;
  
  // Draw the WebGL canvas content to the export canvas at higher resolution
  ctx.drawImage(canvas, 0, 0, exportCanvas.width, exportCanvas.height);
  
  try {
    const blob = await new Promise<Blob>((resolve) => {
      exportCanvas.toBlob(
        (b) => resolve(b!),
        `image/${format}`,
        1.0 // Maximum quality
      );
    });
    
    saveAs(blob, `fractal-${Date.now()}.${format}`);
  } catch (error) {
    console.error('Failed to export image:', error);
    alert('Failed to export image. Please try again.');
  }
}