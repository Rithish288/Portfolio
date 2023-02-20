import { Inject, Injectable } from "@angular/core";
import { WebglBoilerPlateService } from "src/app/services/webgl-boiler-plate.service";
import { ShaderService } from "src/app/services/shader.service";
import { lastValueFrom } from "rxjs";
import { indices, normals, vertices } from "src/assets/icosphere";
import { mat3, mat4 } from "gl-matrix";
import { MATH } from "math-extended";
import { Matrices, Uniforms } from "src/app/interfaces";
@Injectable()
export class BohrModel3d {
  private gl: WebGL2RenderingContext;
  private vertShader: string = '';
  private fragShader: string = '';
  private aspect: number;
  private program: WebGLProgram;
  private translation: number[] = [];
  private animation: number ;
  private normalMatrix: mat3;
  private matrices: Matrices;
  private angleX: number = 0;
  private angleY: number = 0;
  private unifs: Uniforms;
  private atomicNumber: number;
  public zScale: number = 100;
  private attr = {
    position: 0, normal: 1, translation: 2
  };
  private p: {x: number, y: number} = {x: 0, y: 0};
  private angle: number;
  // private shellProgram: {program: WebGLProgram, verts: number};
  // private rings: ElectronRings;
  constructor(private canvas: HTMLCanvasElement, @Inject(Number) private electronShells: number[], private shader: ShaderService) {
    this.gl = this.canvas.getContext("webgl2");
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.cullFace(this.gl.BACK);
    this.gl.frontFace(this.gl.CCW);
    this.atomicNumber = electronShells.reduce((sum, current) => sum+current);
    this.matrices = WebglBoilerPlateService.generateMatrices();
    // this.rings = new ElectronRings(this.gl, electronShells, this.shader, {zScale: this.zScale, aspect: this.aspect});
  }

  public setCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.aspect = this.canvas.width/this.canvas.height;
  }

  private initGL(): void {
    this.initProgram();
    // this.shellProgram = this.rings.start();
    this.enableAttribs();
    this.matrixMults();
    this.setUniforms();
    this.animate();
    window.onresize = this.onResize.bind(this);
  }

  private onMouseMove(e: MouseEvent): void {
    if (e.buttons) {
      this.angleX += e.movementX;
      this.angleY -= e.movementY;
    }
  }

  public start(): void {
    this.getShaders().then(this.initGL.bind(this)).then(() => {
      this.canvas.onmousemove = this.onMouseMove.bind(this);
    });
  }

  private onResize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.aspect = this.canvas.width/this.canvas.height;
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

  private setTranslationLocation() {
    this.electronShells.forEach((shell, i) => {
      i++;
      this.angle = (Math.PI * 2) / shell;
      for (let j = 0; j < shell; j++) {
        this.p.x = Math.cos(this.angle * j + (this.animation * 0.009)/i) * (i/2+1) * 10;
        this.p.y = Math.sin(this.angle * j + (this.animation * 0.009)/i) * (i/2+1) * 10;
        this.translation.push(this.p.x, 0, this.p.y);
      }
    })
  }

  private setUniforms(): void {
    this.unifs = {
      matWorld: this.gl.getUniformLocation(this.program, 'mWorld'),
      matView: this.gl.getUniformLocation(this.program, 'mView'),
      matProj: this.gl.getUniformLocation(this.program, 'mProjection'),
      timePeriod: this.gl.getUniformLocation(this.program, 'u_time'),
      resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
      color: this.gl.getUniformLocation(this.program, 'color'),
      mNormal: this.gl.getUniformLocation(this.program, 'mNormal'),
      ambientColor: this.gl.getUniformLocation(this.program, 'ambientColor'),
      directColor: this.gl.getUniformLocation(this.program, 'directColor')
    }
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix)
    this.gl.uniformMatrix4fv(this.unifs.matView, false, this.matrices.viewMatrix)
    this.gl.uniformMatrix4fv(this.unifs.matProj, false, this.matrices.projMatrix)
    this.gl.uniform2fv(this.unifs.resolution, [this.canvas.width, this.canvas.height], 0);
    this.gl.uniform3fv(this.unifs.color, [0.9, 0.9, 0.1], 0);
    this.gl.uniform3fv(this.unifs.ambientColor, [0.4, 0.4, 0.2], 0);
    this.gl.uniform3fv(this.unifs.directColor, [0.1, 0.2, 0.1], 0);
    this.normalMatrix = mat3.create();
    mat3.invert(this.normalMatrix, mat3.multiply(this.normalMatrix, this.matrices.viewMatrix, this.matrices.worldMatrix));
    mat3.transpose(this.normalMatrix, this.normalMatrix);
  }

  private matrixMults() {
    mat4.identity(this.matrices.worldMatrix);
    mat4.lookAt(this.matrices.viewMatrix, [60, 20, 200-this.zScale], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(this.matrices.projMatrix, MATH.degToRad(45), this.aspect, 0.1, MATH.arithmetics.pow(10, 10));
    mat4.identity(this.matrices.identityMatrix);
  }

  private enableAttribs(): void {
    const pBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, pBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.attr.position, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attr.position);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    const nBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.attr.normal, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attr.normal);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    const tBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, tBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.translation), this.gl.DYNAMIC_DRAW);


    const iBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
  }

  private rotation() {
    mat4.rotate(this.matrices.yrotation, this.matrices.identityMatrix, this.angleX/300, [0, 1, 0]);
    mat4.rotate(this.matrices.xrotation, this.matrices.identityMatrix, -this.angleY/300, [1, 0, 0]);
  }

  private animate(time?: number):void {
    this.rotation();

    mat4.lookAt(this.matrices.viewMatrix, [0, (200-this.zScale)/4 +1  , 200-this.zScale + 1], [0, 0, 0], [0, 1, 0]);
    this.gl.uniformMatrix4fv(this.unifs.matView, false, this.matrices.viewMatrix);
    mat4.mul(this.matrices.worldMatrix, this.matrices.xrotation, this.matrices.yrotation);
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniformMatrix3fv(this.unifs.mNormal, false, this.normalMatrix)
    this.gl.uniform1f(this.unifs.timePeriod, time / 1000.0);

    this.setTranslationLocation();
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.translation), this.gl.DYNAMIC_DRAW)
    this.gl.vertexAttribPointer(this.attr.translation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attr.translation);
    this.gl.vertexAttribDivisor(this.attr.translation, 1);
    this.translation = [];

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);


    this.gl.useProgram(this.program);
    this.gl.drawElementsInstanced(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0, this.atomicNumber);
    // this.gl.useProgram(this.shellProgram.program);
    // this.rings.setBuffers()
    // this.rings.uniformMatrices();
    // this.gl.drawArraysInstanced(this.gl.LINES, 0, this.shellProgram.verts, this.electronShells.length);

    this.animation = requestAnimationFrame(this.animate.bind(this));
  }
}
