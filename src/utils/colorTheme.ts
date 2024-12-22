import { FractalSettings } from '../types';

export function applyBlackAndWhiteTheme(settings: FractalSettings): FractalSettings {
  return {
    ...settings,
    colorSaturation: 0, // Remove color saturation
    colorBrightness: 2500, // Increase brightness for better contrast
    colorContrast: 1.5, // Enhance contrast
    colorCycle: 0, // Remove color cycling
    colorShift: 0, // Remove color shifting
    glowIntensity: 0.3, // Subtle glow
    shadowDepth: 0.5 // Deeper shadows for contrast
  };
}