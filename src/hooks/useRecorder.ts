import { useState, useRef } from 'react';

export function useRecorder(canvas: HTMLCanvasElement | null) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = () => {
    if (!canvas) return;
    chunks.current = [];
    const stream = canvas.captureStream(60); // 60 FPS

    // Try different codecs in order of preference
    const mimeTypes = [
      'video/webm;codecs=h264',
      'video/webm;codecs=vp9',
      'video/webm'
    ];

    let options;
    for (const mimeType of mimeTypes) {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        options = {
          mimeType,
          videoBitsPerSecond: 50000000 // 50 Mbps for high quality
        };
        break;
      }
    }

    try {
      mediaRecorder.current = new MediaRecorder(stream, options);
    } catch (e) {
      console.warn('Falling back to default codec');
      mediaRecorder.current = new MediaRecorder(stream);
    }

    mediaRecorder.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `fractal-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);

      // Show conversion instructions
      alert(
        'Video saved in WebM format.\n\n' +
        'To convert to MOV or AVI:\n\n' +
        '1. Using FFmpeg (free, command line):\n' +
        '   ffmpeg -i input.webm -c:v prores_ks output.mov\n\n' +
        '2. Using HandBrake (free, GUI):\n' +
        '   - Open the WebM file\n' +
        '   - Select MOV container\n' +
        '   - Use high quality settings\n\n' +
        '3. Online converter options:\n' +
        '   - CloudConvert\n' +
        '   - Online-Convert\n' +
        '   - Convertio'
      );
    };

    mediaRecorder.current.start(100); // Capture more frequently for smoother footage
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording
  };
}