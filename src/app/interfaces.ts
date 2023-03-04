import { mat3 } from "gl-matrix"

export interface Uniforms {
  matWorld: WebGLUniformLocation;
  matView: WebGLUniformLocation;
  matProj: WebGLUniformLocation;
  timePeriod: WebGLUniformLocation;
  resolution: WebGLUniformLocation;
  color: WebGLUniformLocation;
  opacity?: WebGLUniformLocation;
  mNormal?: WebGLUniformLocation;
  ambientColor?: WebGLUniformLocation;
  directColor?: WebGLUniformLocation;
  scale?: WebGLUniformLocation;
}

export interface Matrices {
  xrotation: Float32Array;
  yrotation: Float32Array;
  identityMatrix: Float32Array;
  worldMatrix: Float32Array;
  viewMatrix: Float32Array;
  projMatrix: Float32Array;
  normalMatrix?: mat3;
}

export interface Angle {
  x: number;
  y: number;
  z?: number;
}
