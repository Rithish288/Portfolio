import { Inject, Injectable, OnDestroy } from "@angular/core";
import { WebglBoilerPlateService } from "app/services/webgl-boiler-plate.service";
import { ShaderService } from "app/services/shader.service";
import { lastValueFrom } from "rxjs";
import { indices, normals, vertices } from "assets/icosphere";
import { mat3, mat4 } from "gl-matrix";
import { MATH } from "math-extended";
import { Angle, Matrices, Uniforms, Buffers } from "app/interfaces";
@Injectable()
export class BohrModel3d implements OnDestroy {
  private gl: WebGL2RenderingContext;
  private vertShader: string = '';
  private fragShader: string = '';
  private aspect: number;
  private program: WebGLProgram;
  private translation: Float32Array;
  private nucTranslation: Float32Array = new Float32Array([0, 0, 0]);
  private animation: number;
  private matrices: Matrices;
  private buffers: Buffers;
  private angle: Angle = {x: 0, y: 0};
  private unifs: Uniforms;
  private atomicNumber: number;
  public zScale: number = 120;
  private attr = {position: 0, normal: 0, translation: 0};
  private p: {x: number, y: number, z: number} = {x: 0, y: 0, z: 0};
  constructor(private canvas: HTMLCanvasElement, @Inject(Number) private electronShells: number[], private shader: ShaderService) {
    this.gl = this.canvas.getContext("webgl2");
    this.atomicNumber = electronShells.reduce((sum, current) => sum+current);
    this.matrices = WebglBoilerPlateService.generateMatrices();
    this.translation = new Float32Array(this.atomicNumber * 3);
  }

  private setCanvasDimensions(): void {
    const getProp = (property: string) => window.getComputedStyle(this.canvas.parentElement, null).getPropertyValue(property);
    this.canvas.width = Math.round(parseFloat(getProp("width"))/2 - 2 * parseFloat(getProp("padding-inline")) * window.devicePixelRatio);
    if(window.innerWidth > 650)
      this.canvas.height = parseFloat(getProp("height"));
  }

  public setCanvas(): void {
    this.setCanvasDimensions();
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE)
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.cullFace(this.gl.BACK);
    this.gl.frontFace(this.gl.CCW);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.aspect = this.canvas.width/this.canvas.height;
  }

  private initGL(): void {
    this.initProgram();
    this.setAttribLoc();
    this.setBuffersAndAttribs();
    this.matrixMults();
    this.setUniforms();
    this.animate();
    window.onresize = this.onResize.bind(this);
  }

  private onMouseMove(e: MouseEvent): void {
    if (!e.buttons) return
    this.angle.x += e.movementX;
    this.angle.y -= e.movementY;
  }

  public start(): void {
    this.getShaders().then(this.initGL.bind(this)).then(() => {
      this.canvas.onmousemove = this.onMouseMove.bind(this);
    });
  }

  private onResize(): void {
    this.setCanvasDimensions();
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.aspect = this.canvas.width/this.canvas.height;
    mat4.perspective(this.matrices.projMatrix, MATH.degToRad(45), this.aspect, 0.1, MATH.arithmetics.pow(10, 10));
    this.gl.uniformMatrix4fv(this.unifs.matProj, false, this.matrices.projMatrix);
  }

  private async getShaders(): Promise<void> {
    this.fragShader = await lastValueFrom(this.shader.getBohrModelElectronShaders().fragment);
    this.vertShader = await lastValueFrom(this.shader.getBohrModelElectronShaders().vertex);
  }

  private initProgram(): void {
    this.program = WebglBoilerPlateService.createProgram(
      this.gl,
      WebglBoilerPlateService.createShader(this.gl, this.vertShader, 'vertex'),
      WebglBoilerPlateService.createShader(this.gl, this.fragShader, 'fragment')
    );
    this.gl.useProgram(this.program);
  }

  private setElectronTranslationLocation(t: number) {
    let angle: number;
    let c = 0;
    this.electronShells.forEach((shell, i) => {
      i++;
      angle = (Math.PI * 2) / shell;
      for (let j = 0; j < shell; j++) {
        this.p.x = Math.cos(angle * j + (t * 0.001)/i) * (i/2+1) * 10;
        this.p.y = Math.sin(angle * j + (t * 0.001)/i) * (i/2+1) * 10;
        this.translation[c] = this.p.x;
        this.translation[c+1] = this.p.z;
        this.translation[c+2] = this.p.y;
        c+=3;
      }
    })
  }

  private setAttribLoc(): void {
    this.attr.position = this.gl.getAttribLocation(this.program, "aPosition");
    this.attr.normal = this.gl.getAttribLocation(this.program, "aNormal");
    this.attr.translation = this.gl.getAttribLocation(this.program, "aTranslation");
  }

  private setUniforms(): void {
    this.unifs = WebglBoilerPlateService.setUniforms(this.gl, this.program);
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniformMatrix4fv(this.unifs.matView, false, this.matrices.viewMatrix);
    this.gl.uniformMatrix4fv(this.unifs.matProj, false, this.matrices.projMatrix);
    this.gl.uniform2fv(this.unifs.resolution, [this.canvas.width, this.canvas.height], 0);
    this.gl.uniform3fv(this.unifs.color, [0.9, 0.9, 0.1], 0);
    this.gl.uniform3fv(this.unifs.ambientColor, [0.4, 0.4, 0.2], 0);
    this.gl.uniform3fv(this.unifs.directColor, [0.1, 0.2, 0.1], 0);

    //normal matrix for lighting
    this.matrices.normalMatrix = mat3.create();
    mat3.invert(this.matrices.normalMatrix, mat3.multiply(this.matrices.normalMatrix, this.matrices.viewMatrix, this.matrices.worldMatrix));
    mat3.transpose(this.matrices.normalMatrix, this.matrices.normalMatrix);
  }

  private matrixMults() {
    mat4.identity(this.matrices.worldMatrix);
    mat4.lookAt(this.matrices.viewMatrix, [Math.cos(Math.PI), 20, 200-this.zScale], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(this.matrices.projMatrix, MATH.degToRad(45), this.aspect, 0.1, MATH.arithmetics.pow(10, 10));
    mat4.identity(this.matrices.identityMatrix);
  }

  private setBuffersAndAttribs(): void {
    this.buffers = WebglBoilerPlateService.genbuffers(this.gl);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.attr.position, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attr.position);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.normal);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.attr.normal, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attr.normal);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.translation);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.translation), this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(this.attr.translation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attr.translation);
    this.gl.vertexAttribDivisor(this.attr.translation, 1);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
  }

  private rotation(): void {
    mat4.rotate(this.matrices.yrotation, this.matrices.identityMatrix, this.angle.x/300, [0, 1, 0]);
    mat4.rotate(this.matrices.xrotation, this.matrices.identityMatrix, -this.angle.y/300, [1, 0, 0]);
    mat4.lookAt(this.matrices.viewMatrix, [0, (200-this.zScale)/(1*this.zScale) +3, 200-this.zScale + 1], [0, 0, 0], [0, 1, 0]);
    mat4.mul(this.matrices.worldMatrix, this.matrices.xrotation, this.matrices.yrotation);
    this.gl.uniformMatrix4fv(this.unifs.matView, false, this.matrices.viewMatrix);
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniformMatrix3fv(this.unifs.mNormal, false, this.matrices.normalMatrix);
  }

  private animate(time?: number):void {
    //basically mouse rotation and informing the shader about the rotation
    this.rotation();
    time++;
    this.gl.uniform1f(this.unifs.opacity, 1);

    //drawing the nucleus
    this.gl.uniform3fv(this.unifs.color, [255/255, 0, 173/255], 0);
    this.gl.uniform1f(this.unifs.scale, 2 + Math.sqrt(this.atomicNumber/15));
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.nucTranslation, this.gl.STATIC_DRAW)
    this.gl.drawElementsInstanced(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0, 1);

    //drawing the electrons
    this.gl.uniform1f(this.unifs.scale, 0.6);
    this.gl.uniform3fv(this.unifs.color, [0.9, 0.9, 0.1], 0);
    this.setElectronTranslationLocation(time);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.translation, this.gl.DYNAMIC_DRAW);
    this.gl.drawElementsInstanced(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0, this.atomicNumber);

    this.animation = requestAnimationFrame(this.animate.bind(this));
  }

  ngOnDestroy(): void {
    window.cancelAnimationFrame(this.animation);
    for(const buffer in this.buffers) this.gl.deleteBuffer(buffer);
  }
}
