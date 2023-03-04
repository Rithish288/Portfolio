#version 300 es
precision highp float;
in vec3 vLighting;
uniform vec3 color;
uniform float opacity;
out vec4 finalColor;

void main() {
  finalColor = vec4(color * vLighting * 2.1, opacity);
}
