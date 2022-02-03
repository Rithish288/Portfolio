precision mediump float;
attribute vec3 vPosition;
uniform float u_time;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;
uniform vec3 mTranslate;

float rand(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);

	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

void main() {
  gl_PointSize = 3.0;
  vec3 pos = vPosition;
  pos.x += noise(vec2(u_time, 0.0)) * max(sign(pos.x), 0.0);
  gl_Position = mProjection * mView * mWorld * vec4(pos.x, pos.y, pos.z, 1.0);
}
