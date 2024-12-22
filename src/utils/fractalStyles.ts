import { FractalSettings } from '../types';
import { controlRanges } from './fractalRanges';
import { baseSettings } from './fractalDefaults';

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randomizeStyle(styleNum: number): FractalSettings {
  // Start with base settings to ensure all properties are initialized
  const settings: FractalSettings = { ...baseSettings };
  
  // Randomize all controls within their ranges
  Object.entries(controlRanges).forEach(([key, range]) => {
    settings[key as keyof FractalSettings] = randomRange(range.min, range.max);
  });

  // Always set maximum color saturation and reduce noise
  settings.colorSaturation = 1.0;
  settings.noiseScale = 0;
  settings.glowIntensity = 0.2;
  settings.shadowDepth = 0.2;
  settings.turbulence = 0;

  // Ensure iterations stay within max limit of 5
  settings.iterations = Math.min(5, Math.floor(settings.iterations));

  switch (styleNum) {
    case 1: // Crystal
      return {
        ...settings,
        iterations: Math.floor(randomRange(3, 5)),
        rotationSpeed: randomRange(1.5, 2.5),
        colorBrightness: randomRange(2000, 2500),
        symmetryCount: 8,
        kaleidoscopeAngle: Math.PI / 4,
        fractalStyle: 1,
        crystalSize: randomRange(0.8, 1.2),
        crystalDensity: randomRange(4, 6),
        crystalSharpness: randomRange(0.8, 1.2),
        crystalRefraction: randomRange(0.9, 1.1),
        crystalRotation: randomRange(0, Math.PI * 2)
      };

    case 2: // Plasma
      return {
        ...settings,
        iterations: Math.floor(randomRange(3, 5)),
        rotationSpeed: randomRange(0.3, 0.7),
        colorBrightness: randomRange(2200, 2700),
        waveAmplitude: randomRange(1.0, 1.5),
        fractalStyle: 2,
        dimensionWarp: randomRange(0.3, 0.7),
        dimensionFlow: randomRange(0.4, 0.8),
        dimensionFold: randomRange(0.5, 1.5),
        dimensionRipple: randomRange(0.3, 0.8)
      };

    case 3: // Nova
      return {
        ...settings,
        iterations: Math.floor(randomRange(3, 5)),
        rotationSpeed: randomRange(1.5, 2.5),
        zoomScale: randomRange(1.8, 2.2),
        spiralIntensity: randomRange(1.0, 1.5),
        fractalStyle: 3,
        dimensionRipple: randomRange(0.5, 1.5),
        dimensionWarp: randomRange(0.2, 0.6),
        dimensionFold: randomRange(0.3, 0.7),
        dimensionFlow: randomRange(0.4, 0.8)
      };

    case 4: // Wave
      return {
        ...settings,
        iterations: Math.floor(randomRange(3, 5)),
        rotationSpeed: 1.2,
        zoomScale: 2.5,
        waveAmplitude: 1.5,
        waveFrequency: 3.0,
        symmetryCount: 8,
        fractalStyle: 4,
        dimensionFlow: randomRange(0.3, 0.7),
        dimensionWarp: randomRange(0.2, 0.5),
        dimensionRipple: randomRange(0.4, 0.9)
      };

    case 5: // Energy
      return {
        ...settings,
        iterations: Math.floor(randomRange(3, 5)),
        rotationSpeed: 2.0,
        pulseRate: 1.5,
        pulseAmplitude: 0.8,
        glowIntensity: 0.6,
        fractalStyle: 5,
        dimensionWarp: randomRange(0.4, 0.8),
        dimensionFlow: randomRange(0.3, 0.7),
        dimensionFold: randomRange(0.2, 0.6)
      };

    default:
      return {
        ...settings,
        iterations: Math.floor(randomRange(3, 5)),
        fractalStyle: styleNum,
        spiralIntensity: randomRange(0.5, 2.0),
        symmetryCount: Math.floor(randomRange(3, 12)),
        colorBrightness: randomRange(2000, 3000),
        rotationSpeed: randomRange(0.5, 2.0),
        waveAmplitude: randomRange(0.5, 1.5),
        pulseRate: randomRange(0.5, 1.5)
      };
  }
}