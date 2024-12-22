import React from 'react';
import { Save, Trash2, Download, Upload, Keyboard } from 'lucide-react';
import { Scene, FractalSettings } from '../types';

interface SceneLibraryProps {
  scenes: Scene[];
  currentSettings: FractalSettings;
  onLoadScene: (scene: Scene) => void;
  onSaveScene: (name: string) => void;
  onDeleteScene: (id: string) => void;
}

export function SceneLibrary({
  scenes,
  currentSettings,
  onLoadScene,
  onSaveScene,
  onDeleteScene,
}: SceneLibraryProps) {
  const handleSave = () => {
    const name = prompt('Enter a name for this scene:');
    if (name) onSaveScene(name);
  };

  const exportScenes = () => {
    const data = JSON.stringify(scenes);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fractal-scenes.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importScenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedScenes = JSON.parse(event.target?.result as string);
        localStorage.setItem('fractalScenes', JSON.stringify(importedScenes));
        window.location.reload();
      } catch (error) {
        console.error('Failed to import scenes:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-background-secondary p-4 rounded-lg flex flex-col h-[300px]">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-white">Scene Library</h2>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-2 bg-background-tertiary text-white rounded-lg hover:bg-gray-800"
          >
            <Save size={16} />
            Save Current
          </button>
          <button
            onClick={exportScenes}
            className="flex items-center gap-2 px-3 py-2 bg-background-tertiary text-white rounded-lg hover:bg-gray-800"
          >
            <Download size={16} />
            Export
          </button>
          <label className="flex items-center gap-2 px-3 py-2 bg-background-tertiary text-white rounded-lg hover:bg-gray-800 cursor-pointer">
            <Upload size={16} />
            Import
            <input
              type="file"
              accept=".json"
              onChange={importScenes}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="overflow-y-auto flex-1 space-y-2 pr-2 custom-scrollbar">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className="flex items-center justify-between bg-background-tertiary p-3 rounded hover:bg-gray-800 transition-colors"
          >
            <div>
              <h3 className="text-white font-medium">{scene.name}</h3>
              <p className="text-gray-400 text-sm">
                {new Date(scene.timestamp).toLocaleString()}
                {scene.hotkeys && (
                  <span className="ml-2 inline-flex items-center text-blue-400">
                    <Keyboard size={12} className="mr-1" />
                    {scene.hotkeys.presets.length} presets
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onLoadScene(scene)}
                className="px-3 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Load
              </button>
              <button
                onClick={() => onDeleteScene(scene.id)}
                className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                title="Delete Scene"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}