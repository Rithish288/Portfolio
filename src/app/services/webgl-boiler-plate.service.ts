import { Injectable } from '@angular/core';
import { Buffers, Matrices, Uniforms } from '../interfaces';

@Injectable({
  providedIn: 'any'
})
export class WebglBoilerPlateService {
  /**
   * Creates a program from 2 shaders.
   *
   * @param {WebGLRenderingContext | WebGL2RenderingContext} gl The WebGL context.
   * @param {WebGLShader} vertexShader A vertex shader.
   * @param {WebGLShader} fragmentShader A fragment shader.
   * @returns {WebGLProgram} A program.
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

    gl.validateProgram(program);
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("Error validating program");
        gl.deleteProgram(program);
        return null;
    }

    return program;
  }

  /**
   * Creates and compiles a shader.
   *
   * @param {WebGLRenderingContext} gl The WebGL Context.
   * @param {string} source The GLSL source code for the shader.
   * @param {number} type The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
   * @returns {WebGLShader} The shader.
   */
  public static createShader(gl: WebGL2RenderingContext, source: string, type: "fragment" | "vertex" | WebGL2RenderingContext["VERTEX_SHADER" | "FRAGMENT_SHADER"]): WebGLShader {
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

  /**
   * Generates the set of matrices required for rendering.
   * @returns {Matrices} The set of matrices
   */
  public static generateMatrices(): Matrices {
    const matrices = {
      xrotation: new Float32Array(16),
      yrotation: new Float32Array(16),
      identityMatrix: new Float32Array(16),
      worldMatrix: new Float32Array(16),
      viewMatrix: new Float32Array(16),
      projMatrix: new Float32Array(16)
    };
    return matrices;
  }

  public static setUniforms(gl: WebGL2RenderingContext, program: WebGLProgram): Uniforms {
    return {
      matWorld: gl.getUniformLocation(program, 'mWorld'),
      matView: gl.getUniformLocation(program, 'mView'),
      matProj: gl.getUniformLocation(program, 'mProjection'),
      timePeriod: gl.getUniformLocation(program, 'u_time'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      color: gl.getUniformLocation(program, 'color'),
      mNormal: gl.getUniformLocation(program, 'mNormal'),
      ambientColor: gl.getUniformLocation(program, 'ambientColor'),
      directColor: gl.getUniformLocation(program, 'directColor'),
      scale: gl.getUniformLocation(program, 'scale'),
      opacity: gl.getUniformLocation(program, 'opacity')
    }
  }

  public static genbuffers(gl: WebGL2RenderingContext): Buffers {
    return {
      position: gl.createBuffer(),
      normal: gl.createBuffer(),
      translation: gl.createBuffer(),
      indices: gl.createBuffer()
    }
  }
}
