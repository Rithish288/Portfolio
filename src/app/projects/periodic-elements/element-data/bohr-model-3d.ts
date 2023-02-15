import { Inject, Injectable, OnDestroy } from "@angular/core";
import { WebglBoilerPlateService } from "src/app/services/webgl-boiler-plate.service";
import { ShaderService } from "src/app/services/shader.service";
import { lastValueFrom } from "rxjs";
import { indices, normals, vertices } from "src/assets/icosphere";
import { mat3, mat4 } from "gl-matrix";
import { MATH } from "math-extended";

interface Uniforms {
  matWorld: WebGLUniformLocation
  matView: WebGLUniformLocation
  matProj: WebGLUniformLocation
  timePeriod: WebGLUniformLocation
  resolution: WebGLUniformLocation
  color: WebGLUniformLocation
  mNormal: WebGLUniformLocation
  ambientColor: WebGLUniformLocation
  directColor: WebGLUniformLocation
}

@Injectable()
export class BohrModel3d implements OnDestroy {
  private gl: WebGL2RenderingContext;
  private vertShader: string = '';
  private fragShader: string = '';
  private aspect: number;
  private program: WebGLProgram;
  private translation: number[] = [];
  private animation: number ;
  private normalMatrix: mat3;
  private matrices = {
    xrotation: new Float32Array(16),
    yrotation: new Float32Array(16),
    identityMatrix: new Float32Array(16),
    worldMatrix: new Float32Array(16),
    viewMatrix: new Float32Array(16),
    projMatrix: new Float32Array(16),
  }
  private angleX: number = 0;
  private angleY: number = 0;
  private unifs: Uniforms;
  private touch: boolean;
  private previousTouch: Touch;
  private currentAngle: number = 0;

  private attribs = {
    position: 0, normal: 1, translation: 2
  };
  private p: {x: number, y: number} = {x: 0, y: 0};
  private angle: number;
  constructor(private canvas: HTMLCanvasElement, @Inject(Number) private electronShells: number[], private shader: ShaderService) {
    this.gl = this.canvas.getContext("webgl2");
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.cullFace(this.gl.BACK);
    this.gl.frontFace(this.gl.CCW)
  }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
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
    this.enableAttribs();
    this.matrixMults();
    this.setUniforms();
    this.animate();
    window.onresize = this.onResize.bind(this);
  }

  private onMouseMove(e: MouseEvent): void {
    if (e.buttons) {
      // this.touch = true;
      this.angleX += e.movementX;
      this.angleY -= e.movementY;
    }
  }

  public start(): void {
    this.getShaders().then(this.initGL.bind(this)).then(() => {
      this.canvas.onmousemove = this.onMouseMove.bind(this);
      // this.canvas.ontouchmove = this.onTouchMove.bind(this);
      // this.canvas.ontouchend = (ev: TouchEvent) => {
      //   this.previousTouch = null;
      // };
    });
  }

  private onResize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.aspect = this.canvas.width/this.canvas.height;
  }

  private async getShaders(): Promise<void> {
    this.fragShader = await lastValueFrom(this.shader.getBohrModelShaders().fragment);
    this.vertShader = await lastValueFrom(this.shader.getBohrModelShaders().vertex);
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
        this.p.x = Math.cos(this.angle * j + (this.animation * 0.005)/ i) * i * 7;
        this.p.y = Math.sin(this.angle * j + (this.animation * 0.005)/ i) * i * 7;
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
    // this.gl.uniform3fv(this.unifs.color, [MATH.map(255, 0, 255, 0, 1), MATH.map(30, 0, 255, 0, 1), MATH.map(20, 0, 255, 0, 1)], 0);
    this.gl.uniform3fv(this.unifs.color, [0.9, 0.9, 0.1], 0);
    this.gl.uniform3fv(this.unifs.ambientColor, [0.4, 0.4, 0.2], 0);
    this.gl.uniform3fv(this.unifs.directColor, [0.1, 0.2, 0.1], 0);
    this.normalMatrix = mat3.create();
    mat3.invert(this.normalMatrix, mat3.multiply(this.normalMatrix, this.matrices.viewMatrix, this.matrices.worldMatrix));
    mat3.transpose(this.normalMatrix, this.normalMatrix);
  }

  private matrixMults() {
    mat4.identity(this.matrices.worldMatrix);
    mat4.lookAt(this.matrices.viewMatrix, [60, 20, 40], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(this.matrices.projMatrix, MATH.degToRad(45), this.aspect, 0.1, MATH.arithmetics.pow(10, 10));
    mat4.identity(this.matrices.identityMatrix);
  }

  private enableAttribs(): void {
    this.attribs.position = this.gl.getAttribLocation(this.program, 'aPosition');
    this.attribs.translation = this.gl.getAttribLocation(this.program, 'aTranslation');
    this.attribs.normal = this.gl.getAttribLocation(this.program, 'aNormal');

    const pBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, pBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.attribs.position, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attribs.position);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    const nBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.attribs.normal, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attribs.normal);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    const tBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, tBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.translation), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.attribs.translation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attribs.translation);
    this.gl.vertexAttribDivisor(this.attribs.translation, 1);

    const iBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
  }

  private rotation() {
    // if(!this.touch) {
    //   this.currentAngle += 5;
    //   this.angleX = this.currentAngle;
    //   mat4.rotate(this.matrices.yrotation, this.matrices.identityMatrix, this.angleX/300, [0, 1, 0]);
    // } else
    mat4.rotate(this.matrices.yrotation, this.matrices.identityMatrix, this.angleX/300, [0, 1, 0]);
    mat4.rotate(this.matrices.xrotation, this.matrices.identityMatrix, -this.angleY/300, [1, 0, 0]);
  }

  private animate(time?: number):void {
    this.rotation();
    mat4.mul(this.matrices.worldMatrix, this.matrices.xrotation, this.matrices.yrotation);
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniformMatrix3fv(this.unifs.mNormal, false, this.normalMatrix)
    this.gl.uniform1f(this.unifs.timePeriod, time / 1000.0);
    this.setTranslationLocation();
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.translation), this.gl.STATIC_DRAW)
    this.gl.vertexAttribPointer(this.attribs.translation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attribs.translation);
    this.translation = [];
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawElementsInstanced(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0, 47);
    this.animation = requestAnimationFrame(this.animate.bind(this));
  }
}
