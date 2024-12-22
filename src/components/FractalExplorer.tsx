import React, { useRef, useState, useCallback } from 'react';
import { Book, PanelLeft, PanelRight } from 'lucide-react';
import { useWebGL } from '../hooks/useWebGL';
import { StyleButtons } from './StyleButtons';
import { PresetButtons } from './PresetButtons';
import { PlaybackControls } from './PlaybackControls';
import { ExportControls } from './ExportControls';
import { FullscreenToggle } from './FullscreenToggle';
import { ControlPanel } from './panels/ControlPanel';
import { SceneLibraryModal } from './modals/SceneLibraryModal';
import { vertexShaderSource, fragmentShaderSource } from '../shaders/fractalShader';
import { FractalSettings, Scene } from '../types';
import { defaultSettings } from '../utils/fractalDefaults';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { useCanvasSize } from '../hooks/useCanvasSize';
import { useSceneLibrary } from '../hooks/useSceneLibrary';
import { useRecorder } from '../hooks/useRecorder';
import { useViewportOptimization } from '../hooks/useViewportOptimization';

export default function FractalExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [settings, setSettings] = useState<FractalSettings>(defaultSettings);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSceneLibraryOpen, setIsSceneLibraryOpen] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  
  const { gl, program } = useWebGL(canvasRef.current, vertexShaderSource, fragmentShaderSource);
  const { scenes, saveScene, deleteScene, loadScene } = useSceneLibrary();
  const { isRecording, startRecording, stopRecording } = useRecorder(canvasRef.current);
  const { isVisible, isReducedMotion } = useViewportOptimization();
  
  useCanvasSize(canvasRef, gl);

  const handleSettingsChange = useCallback((newSettings: FractalSettings) => {
    setSettings(newSettings);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const handleLoadScene = useCallback((scene: Scene) => {
    const newSettings = loadScene(scene);
    setSettings(newSettings);
    setIsSceneLibraryOpen(false);
  }, [loadScene]);

  const handleSaveScene = useCallback((name: string) => {
    saveScene(name, settings);
    setIsSceneLibraryOpen(false);
  }, [saveScene, settings]);

  useAnimationFrame((time) => {
    if (!gl || !program || !isPlaying || !isVisible || (isReducedMotion && !isRecording)) return;
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(program);

    const uniforms = {
      time: time * 0.001,
      resolution: [gl.canvas.width, gl.canvas.height],
      ...settings
    };

    Object.entries(uniforms).forEach(([name, value]) => {
      const location = gl.getUniformLocation(program, name);
      if (location !== null) {
        if (Array.isArray(value)) {
          gl.uniform2f(location, value[0], value[1]);
        } else {
          gl.uniform1f(location, value);
        }
      }
    });

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, [gl, program, settings, isPlaying, isVisible, isReducedMotion, isRecording]);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Left Panel - Basic Controls (Desktop) */}
      {!isFullscreen && (
        <div className="hidden lg:block w-80 bg-background-secondary border-r border-background-tertiary overflow-y-auto custom-scrollbar">
          <ControlPanel
            title="Basic Controls"
            settings={settings}
            onSettingsChange={handleSettingsChange}
            type="basic"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="p-4">
          <div className="bg-background-secondary rounded-lg shadow-xl overflow-hidden">
            {/* Controls Header */}
            <div className={`p-4 border-b border-background-tertiary ${
              isFullscreen ? 'bg-black/50 absolute top-0 left-0 right-0 z-10' : ''
            }`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
                {!isFullscreen && (
                  <div className="flex flex-col gap-2">
                    <StyleButtons onSettingsChange={handleSettingsChange} />
                    <PresetButtons onLoadPreset={handleSettingsChange} currentSettings={settings} />
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIsSceneLibraryOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-background-tertiary text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Book size={16} />
                    Scenes
                  </button>
                  <PlaybackControls
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    isRecording={isRecording}
                    onRecord={isRecording ? stopRecording : startRecording}
                  />
                  <ExportControls
                    canvas={canvasRef.current}
                    isRecording={isRecording}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                  />
                  <FullscreenToggle
                    isFullscreen={isFullscreen}
                    onToggle={handleFullscreenToggle}
                  />
                </div>
              </div>
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className={`w-full ${isFullscreen ? 'h-screen' : 'aspect-video'} bg-black`}
            />
          </div>
        </div>

        {/* Mobile Controls */}
        {!isFullscreen && (
          <div className="lg:hidden px-4 pb-4">
            {/* Mobile Toggle Buttons */}
            <div className="flex justify-between mb-4">
              <button
                onClick={() => setShowLeftPanel(!showLeftPanel)}
                className="flex items-center gap-2 px-3 py-2 bg-background-tertiary text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <PanelLeft size={16} />
                Basic Controls
              </button>
              <button
                onClick={() => setShowRightPanel(!showRightPanel)}
                className="flex items-center gap-2 px-3 py-2 bg-background-tertiary text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <PanelRight size={16} />
                Advanced Controls
              </button>
            </div>

            {/* Mobile Bento Box Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {showLeftPanel && (
                <div className="bg-background-secondary rounded-lg p-4">
                  <ControlPanel
                    title="Basic Controls"
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                    type="basic"
                  />
                </div>
              )}
              {showRightPanel && (
                <div className="bg-background-secondary rounded-lg p-4">
                  <ControlPanel
                    title="Advanced Controls"
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                    type="advanced"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Advanced Controls (Desktop) */}
      {!isFullscreen && (
        <div className="hidden lg:block w-80 bg-background-secondary border-l border-background-tertiary overflow-y-auto custom-scrollbar">
          <ControlPanel
            title="Advanced Controls"
            settings={settings}
            onSettingsChange={handleSettingsChange}
            type="advanced"
          />
        </div>
      )}

      {/* Scene Library Modal */}
      <SceneLibraryModal
        isOpen={isSceneLibraryOpen}
        onClose={() => setIsSceneLibraryOpen(false)}
        scenes={scenes}
        currentSettings={settings}
        onLoadScene={handleLoadScene}
        onSaveScene={handleSaveScene}
        onDeleteScene={deleteScene}
      />
    </div>
  );
}