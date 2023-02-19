#version 300 es
precision lowp float;
in vec3 aPosition;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;

void main() {
  gl_Position = mProjection * mView * mWorld * vec4( aPosition.x, aPosition.y, aPosition.z, 1.0);
}
