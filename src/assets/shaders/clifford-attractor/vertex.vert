#version 300 es
in vec2 a_position;
uniform float uPointSize;
uniform float a;
uniform float b;
uniform float c;
uniform float d;
void main() {
  gl_PointSize = uPointSize;
  gl_Position = vec4(
    sin(a*a_position.y)+c*cos(a*a_position.x),
    sin(b*a_position.x)+d*cos(b*a_position.y),
    0.0, 3.0
  );
}
