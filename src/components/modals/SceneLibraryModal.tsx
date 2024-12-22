import React from 'react';
import { X } from 'lucide-react';
import { SceneLibrary } from '../SceneLibrary';
import { Scene, FractalSettings } from '../../types';

interface SceneLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenes: Scene[];
  currentSettings: FractalSettings;
  onLoadScene: (scene: Scene) => void;
  onSaveScene: (name: string) => void;
  onDeleteScene: (id: string) => void;
}

export function SceneLibraryModal({
  isOpen,
  onClose,
  scenes,
  currentSettings,
  onLoadScene,
  onSaveScene,
  onDeleteScene
}: SceneLibraryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background-secondary rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b border-background-tertiary">
          <h2 className="text-xl font-bold text-white">Scene Library</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-background-tertiary rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <div className="p-4">
          <SceneLibrary
            scenes={scenes}
            currentSettings={currentSettings}
            onLoadScene={onLoadScene}
            onSaveScene={onSaveScene}
            onDeleteScene={onDeleteScene}
          />
        </div>
      </div>
    </div>
  );
}