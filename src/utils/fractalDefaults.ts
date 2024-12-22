import { FractalSettings } from '../types';

export const baseSettings: FractalSettings = {
  iterations: 5,
  rotationSpeed: 2.0,
  zoomScale: 2.0,
  colorSaturation: 0.6,
  colorBrightness: 2000,
  distortX: 4.0,
  distortY: 3.0,
  distortZ: 3.0,
  dotScale: 8.5,
  fractalStyle: 1,
  waveAmplitude: 0.5,
  waveFrequency: 1.0,
  spiralIntensity: 0.5,
  noiseScale: 0,
  symmetryCount: 6,
  kaleidoscopeAngle: 0.0,
  colorCycle: 0.5,
  colorContrast: 1.0,
  colorShift: 0.0,
  depthScale: 1.0,
  turbulence: 0.5,
  swirl: 0.0,
  pulseRate: 0.5,
  pulseAmplitude: 0.3,
  // Enhanced Fractalization Settings
  fractalization: 1.0,
  fractalDepth: 3.0,
  fractalDetail: 1.0,
  fractalComplexity: 1.0,
  fractalDimension: 2.0,
  // Enhanced Tessellation Settings
  tessellation: 1.0,
  tesselationScale: 1.0,
  tesselationDensity: 5.0,
  tesselationPattern: 1,
  tesselationRotation: 0.0,
  // Other Settings
  morphScale: 0.5,
  timeScale: 1.0,
  glowIntensity: 0.5,
  shadowDepth: 0.3
};

export const defaultSettings = baseSettings;