precision mediump float;
attribute vec3 vPosition;
uniform float u_time;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;

void main() {
  gl_PointSize = 1.5;
  gl_Position = mProjection * mView * mWorld * vec4(vPosition.x + cos(u_time/6.0) * 1.5, vPosition.yz + sin(u_time/6.0) * 1.5, 1.0);
}
