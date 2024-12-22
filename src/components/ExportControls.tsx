import React from 'react';
import { Download, Video, Image } from 'lucide-react';
import { exportImage } from '../utils/exportUtils';

interface ExportControlsProps {
  canvas: HTMLCanvasElement | null;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function ExportControls({
  canvas,
  isRecording,
  onStartRecording,
  onStopRecording
}: ExportControlsProps) {
  const handleImageExport = async () => {
    await exportImage(canvas);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleImageExport}
        className="flex items-center gap-2 px-3 py-2 bg-background-tertiary text-white rounded-lg hover:bg-gray-800 transition-colors"
        title="Export as PNG"
      >
        <Image size={16} />
        Export Image
      </button>
      <button
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={`flex items-center gap-2 px-3 py-2 ${
          isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-background-tertiary hover:bg-gray-800'
        } text-white rounded-lg transition-colors`}
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        <Video size={16} />
        {isRecording ? 'Stop Recording' : 'Record Video'}
      </button>
    </div>
  );
}