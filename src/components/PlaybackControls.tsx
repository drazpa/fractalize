import React from 'react';
import { Play, Pause, Square, Video } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isRecording: boolean;
  onPlayPause: () => void;
  onRecord: () => void;
}

export function PlaybackControls({
  isPlaying,
  isRecording,
  onPlayPause,
  onRecord
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPlayPause}
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button
        onClick={onRecord}
        className={`p-2 ${isRecording ? 'bg-red-600' : 'bg-gray-600'} text-white rounded-lg hover:bg-red-700`}
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        {isRecording ? <Square size={20} /> : <Video size={20} />}
      </button>
    </div>
  );
}