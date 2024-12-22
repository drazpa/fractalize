import { useState, useEffect } from 'react';
import { Scene, FractalSettings, SceneHotkeys } from '../types';

export function useSceneLibrary() {
  const [scenes, setScenes] = useState<Scene[]>(() => {
    const saved = localStorage.getItem('fractalScenes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fractalScenes', JSON.stringify(scenes));
  }, [scenes]);

  const saveScene = (name: string, settings: FractalSettings) => {
    // Get current hotkeys from localStorage
    const hotkeys: SceneHotkeys = {
      presets: Array.from({ length: 8 }, (_, i) => {
        const preset = localStorage.getItem(`fractal-preset-${i + 1}`);
        return preset ? {
          index: i + 1,
          settings: JSON.parse(preset)
        } : null;
      }).filter(Boolean) as Array<{ index: number; settings: FractalSettings; }>
    };

    const newScene: Scene = {
      id: crypto.randomUUID(),
      name,
      timestamp: Date.now(),
      settings,
      hotkeys
    };
    setScenes([...scenes, newScene]);
  };

  const deleteScene = (id: string) => {
    setScenes(scenes.filter(scene => scene.id !== id));
  };

  const loadScene = (scene: Scene) => {
    // Restore hotkeys if they exist
    if (scene.hotkeys?.presets) {
      scene.hotkeys.presets.forEach(preset => {
        localStorage.setItem(`fractal-preset-${preset.index}`, JSON.stringify(preset.settings));
      });
    }
    return scene.settings;
  };

  return {
    scenes,
    saveScene,
    deleteScene,
    loadScene,
  };
}