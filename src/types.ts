import { Scene } from './types';

export interface Scene {
  id: string;
  name: string;
  timestamp: number;
  settings: FractalSettings;
  hotkeys?: SceneHotkeys;
}

export interface SceneHotkeys {
  presets: Array<{
    index: number;
    settings: FractalSettings;
  }>;
}

export interface FractalSettings {
  iterations: number;
  rotationSpeed: number;
  zoomScale: number;
  colorSaturation: number;
  colorBrightness: number;
  distortX: number;
  distortY: number;
  distortZ: number;
  dotScale: number;
  fractalStyle: number;
  waveAmplitude: number;
  waveFrequency: number;
  spiralIntensity: number;
  noiseScale: number;
  symmetryCount: number;
  kaleidoscopeAngle: number;
  colorCycle: number;
  colorContrast: number;
  colorShift: number;
  depthScale: number;
  turbulence: number;
  swirl: number;
  pulseRate: number;
  pulseAmplitude: number;
  fractalization: number;
  tessellation: number;
  morphScale: number;
  timeScale: number;
  glowIntensity: number;
  shadowDepth: number;
  fractalDepth: number;
  fractalDetail: number;
  fractalComplexity: number;
  fractalDimension: number;
  tesselationScale: number;
  tesselationDensity: number;
  tesselationPattern: number;
  tesselationRotation: number;
}