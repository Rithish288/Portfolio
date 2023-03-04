precision mediump float;
attribute vec3 vPosition;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;
uniform vec3 translation;
uniform vec2 u_resolution;
uniform float scale;

void main() {
  gl_PointSize = 3.0;
  gl_Position = mProjection * mView * mWorld * vec4(vPosition * scale + translation, 1.0);
}
