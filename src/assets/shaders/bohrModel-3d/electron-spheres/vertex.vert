#version 300 es
precision lowp float;
in vec3 aPosition;
in vec3 aNormal;
in vec3 aTranslation;
uniform vec3 ambientColor;
uniform vec3 directColor;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;
uniform mat3 mNormal;
out vec3 vLighting;

void main() {
    gl_Position = mProjection * mView * mWorld * vec4(
        aPosition.x + aTranslation.x,
        aPosition.y + aTranslation.y,
        aPosition.z + aTranslation.z,
    1.0);
    vec3 directionalVector = vec3(1.0, 0.9, 0.72);

    vec3 transformedNormal = mNormal * aNormal;

    float directional = max(dot(transformedNormal, directionalVector), 0.0);
    vLighting = ambientColor + (directColor * directional);
}
