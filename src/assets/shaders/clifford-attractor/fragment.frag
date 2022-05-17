#version 300 es
precision mediump float;
out vec4 finalColor;
uniform vec3 color;
void main() {
  finalColor = vec4(color, 1.0);
}
