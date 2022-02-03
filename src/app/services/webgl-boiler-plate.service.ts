import { Injectable } from '@angular/core';
import { MATH } from 'math-extended';

interface Color {
  r: number;
  g: number;
  b: number;
}

@Injectable({
  providedIn: 'any'
})
export class WebglBoilerPlateService {

  constructor() { }

  public static primaryColor: Color = {
    r: 115,
    g: 151,
    b: 228
  }

  public static primaryMappedColor: Color = {
    r: MATH.map(115, 0, 255, 0, 1),
    g: MATH.map(151, 0, 255, 0, 1),
    b: MATH.map(228, 0, 255, 0, 1),
  }

  /**
   * Creates a program from 2 shaders.
   *
   * @param {WebGLRenderingContext | WebGL2RenderingContext} gl The WebGL context.
   * @param {WebGLShader} vertexShader A vertex shader.
   * @param {WebGLShader} fragmentShader A fragment shader.
   * @return {WebGLProgram} A program.
   */
  public static createProgram(gl: WebGL2RenderingContext | WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    let program: WebGLProgram = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      console.error("program failed to link:" + gl.getProgramInfoLog (program));
    }

    return program;
  }

  /**
   * Creates and compiles a shader.
   *
   * @param {WebGLRenderingContext} gl The WebGL Context.
   * @param {string} source The GLSL source code for the shader.
   * @param {number} type The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
   * @return {WebGLShader} The shader.
   */
  public static createShader(gl: WebGL2RenderingContext, source: string, type: "fragment" | "vertex"): WebGLShader {
    let shader: WebGLShader;
    if(type == "fragment") shader = gl.createShader(gl.FRAGMENT_SHADER);
    if(type == "vertex") shader = gl.createShader(gl.VERTEX_SHADER);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      console.error("could not compile shader:" + gl.getShaderInfoLog(shader));
    }
    return shader;
  }
}
