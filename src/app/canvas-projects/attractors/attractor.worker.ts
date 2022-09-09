/// <reference lib="webworker" />


interface Uniforms {
  matWorld: WebGLUniformLocation
  matView: WebGLUniformLocation
  matProj: WebGLUniformLocation
  timePeriod: WebGLUniformLocation
  resolution: WebGLUniformLocation
  color: WebGLUniformLocation
}

let canvas;
addEventListener('message', ({ data }) => {
  console.log(globalThis)
  canvas = data.canvas;
  const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
  canvas.width = data.dims.w;
  canvas.height = data.dims.h;
  const aspect = canvas.width / canvas.height;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  postMessage("got all data !")
  console.log(data)
});
