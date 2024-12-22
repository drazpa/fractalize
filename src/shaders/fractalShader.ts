export const vertexShaderSource = `#version 300 es
  in vec4 position;
  void main() {
    gl_Position = position;
  }
`;

export const fragmentShaderSource = `#version 300 es
  precision highp float;

  uniform vec2 resolution;
  uniform float time;
  uniform float iterations;
  uniform float rotationSpeed;
  uniform float zoomScale;
  uniform float colorSaturation;
  uniform float colorBrightness;
  uniform float distortX;
  uniform float distortY;
  uniform float distortZ;
  uniform float dotScale;
  uniform float fractalStyle;
  uniform float waveAmplitude;
  uniform float waveFrequency;
  uniform float spiralIntensity;
  uniform float noiseScale;
  uniform float symmetryCount;
  uniform float kaleidoscopeAngle;
  uniform float colorCycle;
  uniform float colorContrast;
  uniform float colorShift;
  uniform float depthScale;
  uniform float turbulence;
  uniform float swirl;
  uniform float pulseRate;
  uniform float pulseAmplitude;
  uniform float fractalization;
  uniform float tessellation;
  uniform float morphScale;
  uniform float timeScale;
  uniform float glowIntensity;
  uniform float shadowDepth;

  out vec4 fragColor;

  // Improved smooth minimum function with better blending
  float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k * (1.0/6.0);
  }

  // Improved color conversion with better gamma handling
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    vec3 rgb = clamp(p - K.xxx, 0.0, 1.0);
    return c.z * mix(vec3(1.0), rgb, c.y);
  }

  mat2 rotate2D(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
  }

  vec3 applyRotation(vec3 p, mat2 rot, int axis) {
    if (axis == 0) p.yz = rot * p.yz;
    else if (axis == 1) p.xz = rot * p.xz;
    else p.xy = rot * p.xy;
    return p;
  }

  vec3 applySymmetry(vec3 p, float count) {
    float angle = 2.0 * 3.14159 / count;
    mat2 rot = rotate2D(angle);
    vec2 q = vec2(length(p.xz), p.y);
    float a = atan(p.x, p.z);
    a = mod(a + angle/2.0, angle) - angle/2.0;
    p.xz = q.x * vec2(sin(a), cos(a));
    return p;
  }

  // Improved smoothstep function for better transitions
  float smootherstep(float edge0, float edge1, float x) {
    x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution) / min(resolution.x, resolution.y);
    float t = time * rotationSpeed * timeScale;
    vec4 finalColor = vec4(0.0);
    
    // Enhanced anti-aliasing with 8x MSAA
    const int AA_SAMPLES = 8;
    vec2 pixelSize = 1.0 / resolution;
    
    for(int aa = 0; aa < AA_SAMPLES; aa++) {
      vec2 offset = pixelSize * (vec2(
        float(aa & 3),
        float((aa >> 2) & 1)
      ) - 1.5);
      
      vec2 uvAA = uv + offset * 0.5;
      vec4 col = vec4(0.0);
      float g = 0.0;
      float s = 1.0;
      float e = 0.0;

      for(float i = 0.0; i < iterations; i++) {
        float wave = sin(t * waveFrequency) * waveAmplitude;
        float spiral = length(uvAA) * spiralIntensity;
        float zoom = mix(zoomScale, zoomScale + wave, 0.5);
        
        vec3 p;
        float styleMix = fract(fractalStyle);
        int baseStyle = int(floor(fractalStyle));
        
        // Calculate base position with smooth transitions
        if (baseStyle == 1) {
          p = vec3(uvAA * 1.5 * (sin(t*2.)*.2 + zoom), g-.5);
          p = applyRotation(p, rotate2D(t*2. + spiral), 1);
        } else if (baseStyle == 2) {
          p = vec3(uvAA * 1.5 * (cos(t*.5)*.5 + zoom), g-.6);
          p = applyRotation(p, rotate2D(t*.5 + wave), 0);
        } else if (baseStyle == 3) {
          p = vec3(uvAA * 1.5 * (sin(t*2.)*.2 + 2.), g-.5);
          p = applyRotation(p, rotate2D(t*2.), 1);
        } else if (baseStyle == 4) {
          float q = length(uvAA) + sin(atan(uvAA.y, uvAA.x) * 8.0 + t) * 0.1;
          p = vec3(uvAA * (1.5 + sin(q * 4.0 - t) * 0.2), g - 0.5);
          p = applySymmetry(p, max(1.0, symmetryCount));
          p = applyRotation(p, rotate2D(kaleidoscopeAngle + t * swirl), 2);
        } else {
          p = vec3(uvAA * 1.5 * (sin(t)*.3 + zoom), g-.5);
          p = applySymmetry(p, max(1.0, symmetryCount));
          p = applyRotation(p, rotate2D(kaleidoscopeAngle + t * swirl), 2);
        }
        
        s = 1.0;
        
        // Enhanced iteration loop with smooth blending
        for(int j = 0; j < 15; j++) {
          float pulse = sin(t * pulseRate) * pulseAmplitude;
          vec3 distort = vec3(distortX, distortY, distortZ) * (1.0 + pulse);
          
          p = distort-abs(abs(p)*e-vec3(4.0,2.0,2.0));
          
          float d = dot(p,p) * depthScale;
          s *= e = max(1.005, dotScale/d);
          
          p *= fractalization;
          p = mix(p, abs(p), smootherstep(0.0, 1.0, morphScale));
          p *= tessellation;
        }
        
        g += mod(length(p.xz), p.y) / s * 0.5;
        
        float hue = g * colorCycle + colorShift;
        float sat = colorSaturation * colorContrast;
        float val = (s/colorBrightness) * (1.0 + glowIntensity);
        
        vec3 color = hsv2rgb(vec3(hue, sat, val));
        
        // Smooth edge blending
        float edgeFade = smootherstep(0.0, 1.0, 1.0 - length(uvAA));
        color = mix(color * (1.0 - shadowDepth), color, edgeFade);
        
        col.rgb += color;
      }
      
      finalColor += col / float(AA_SAMPLES);
    }
    
    // Enhanced color post-processing
    finalColor.rgb = pow(finalColor.rgb, vec3(1.0/2.2)); // Gamma correction
    finalColor.rgb *= 1.0 - shadowDepth * 0.5;
    finalColor.rgb = mix(
      finalColor.rgb,
      smoothstep(0.0, 1.0, finalColor.rgb),
      0.2
    ); // Subtle contrast enhancement
    
    fragColor = vec4(clamp(finalColor.rgb, 0.0, 1.0), 1.0);
  }
`;