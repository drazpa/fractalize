import { useEffect, useState } from 'react';

export function useWebGL(
  canvas: HTMLCanvasElement | null,
  vertexShader: string,
  fragmentShader: string
) {
  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);
  const [program, setProgram] = useState<WebGLProgram | null>(null);

  useEffect(() => {
    if (!canvas) return;

    // Use WebGL 2.0 with optimized settings
    const glContext = canvas.getContext('webgl2', {
      alpha: false,
      antialias: true,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
      desynchronized: true, // Reduce latency
      failIfMajorPerformanceCaveat: true // Ensure good performance
    });

    if (!glContext) {
      console.error('WebGL 2 not supported');
      return;
    }

    setGl(glContext);

    // Enable all available optimizations
    glContext.getExtension('EXT_color_buffer_float');
    glContext.getExtension('OES_texture_float_linear');
    glContext.getExtension('EXT_float_blend');
    glContext.getExtension('OES_standard_derivatives');

    // Create and compile shaders
    const vShader = glContext.createShader(glContext.VERTEX_SHADER)!;
    const fShader = glContext.createShader(glContext.FRAGMENT_SHADER)!;

    glContext.shaderSource(vShader, vertexShader);
    glContext.shaderSource(fShader, fragmentShader);

    glContext.compileShader(vShader);
    if (!glContext.getShaderParameter(vShader, glContext.COMPILE_STATUS)) {
      console.error('Vertex shader compilation error:', glContext.getShaderInfoLog(vShader));
      return;
    }

    glContext.compileShader(fShader);
    if (!glContext.getShaderParameter(fShader, glContext.COMPILE_STATUS)) {
      console.error('Fragment shader compilation error:', glContext.getShaderInfoLog(fShader));
      return;
    }

    // Create and link program
    const shaderProgram = glContext.createProgram()!;
    glContext.attachShader(shaderProgram, vShader);
    glContext.attachShader(shaderProgram, fShader);
    glContext.linkProgram(shaderProgram);

    if (!glContext.getProgramParameter(shaderProgram, glContext.LINK_STATUS)) {
      console.error('Program linking error:', glContext.getProgramInfoLog(shaderProgram));
      return;
    }

    setProgram(shaderProgram);

    // Set up geometry with optimized buffer usage
    const vertices = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);

    const vertexBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, vertexBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);

    const positionLocation = glContext.getAttribLocation(shaderProgram, 'position');
    glContext.enableVertexAttribArray(positionLocation);
    glContext.vertexAttribPointer(positionLocation, 2, glContext.FLOAT, false, 0, 0);

    // Optimize rendering settings
    glContext.disable(glContext.DEPTH_TEST);
    glContext.disable(glContext.BLEND);
    glContext.disable(glContext.CULL_FACE);
    glContext.disable(glContext.DITHER);
    glContext.disable(glContext.STENCIL_TEST);
    glContext.clearColor(0, 0, 0, 1);

    // Enable shader optimizations
    glContext.hint(glContext.FRAGMENT_SHADER_DERIVATIVE_HINT, glContext.FASTEST);
    glContext.hint(glContext.GENERATE_MIPMAP_HINT, glContext.FASTEST);

    return () => {
      glContext.deleteProgram(shaderProgram);
      glContext.deleteShader(vShader);
      glContext.deleteShader(fShader);
      glContext.deleteBuffer(vertexBuffer);
    };
  }, [canvas, vertexShader, fragmentShader]);

  return { gl, program };
}