import { Inject, Injectable, OnDestroy } from "@angular/core";
import { WebglBoilerPlateService } from "app/services/webgl-boiler-plate.service";
import { ShaderService } from "app/services/shader.service";
import { lastValueFrom } from "rxjs";
import { indices, normals, vertices } from "assets/icosphere";
import { mat3, mat4 } from "gl-matrix";
import { MATH } from "math-extended";
import { Angle, Matrices, Uniforms } from "app/interfaces";
@Injectable()
export class BohrModel3d implements OnDestroy {
  private gl: WebGL2RenderingContext;
  private vertShader: string = '';
  private fragShader: string = '';
  private aspect: number;
  private program: WebGLProgram;
  private translation: number[] = [];
  // private nutrtranslation: Float32Array;
  // private protranslation: Float32Array;
  private nucTranslation: Float32Array = new Float32Array([0, 0, 0]);
  private animation: number;
  private matrices: Matrices;
  private angle: Angle = {x: 0, y: 0};
  private unifs: Uniforms;
  private atomicNumber: number;
  public zScale: number = 120;
  private attr = {
    position: 0, normal: 1, translation: 2
  };
  private p: {x: number, y: number, z: number} = {x: 0, y: 0, z: 0};
  constructor(private canvas: HTMLCanvasElement, @Inject(Number) private electronShells: number[], private shader: ShaderService) {
    this.gl = this.canvas.getContext("webgl2");
    this.atomicNumber = electronShells.reduce((sum, current) => sum+current);
    this.matrices = WebglBoilerPlateService.generateMatrices();
  }

  private setCanvasDimensions(): void {
    this.canvas.width = parseFloat(window.getComputedStyle(this.canvas.parentElement, null).getPropertyValue("width"))/2 - 2 * parseFloat(window.getComputedStyle(this.canvas.parentElement, null).getPropertyValue("padding"));
    if(window.innerWidth > 650)
      this.canvas.height = parseFloat(window.getComputedStyle(this.canvas.parentElement, null).getPropertyValue("height"));
  }

  public setCanvas(): void {
    this.setCanvasDimensions();
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE)
    this.gl.enable(this.gl.BLEND);
    this.gl.cullFace(this.gl.BACK);
    this.gl.frontFace(this.gl.CCW);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.aspect = this.canvas.width/this.canvas.height;
  }

  private initGL(): void {
    this.initProgram();
    this.setBuffersAndAttribs();
    this.matrixMults();
    this.setAttribLoc();
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
    this.electronShells.forEach((shell, i) => {
      i++;
      angle = (Math.PI * 2) / shell;
      for (let j = 0; j < shell; j++) {
        this.p.x = Math.cos(angle * j + (t * 0.001)/i) * (i/2+1) * 10;
        this.p.y = Math.sin(angle * j + (t * 0.001)/i) * (i/2+1) * 10;
        this.translation.push(this.p.x, this.p.z, this.p.y);
      }
    })
  }

  // private setNucleusTranslationLocation() {
  //   let translation = [];
  //   this.electronShells.forEach((shell, i) => {
  //     for (let j = 0; j < shell; j++) {
  //       this.p.x = Math.cos(MATH.randomIntFromRange(-1, 1)) * Math.cos(MATH.randomIntFromRange(-1, 1)) * MATH.randomIntFromZeroToRange(4);
  //       this.p.y = Math.sin(MATH.randomIntFromRange(-1, 1)) * Math.cos(MATH.randomIntFromRange(-1, 1)) * MATH.randomIntFromZeroToRange(4);
  //       this.p.z = Math.sin(MATH.randomIntFromRange(-1, 1)) * MATH.randomIntFromZeroToRange(4);
  //       translation.push(this.p.x, this.p.z, this.p.y);
  //     }
  //   })
  //   this.nuctranslation = new Float32Array(translation);
  // }

  // private setRingsTranslation() {
  //   let translation = [];
  //   let x: number, y: number;
  //   for(let i = 0; i < 1e4; i++) {
  //     // x = Math;
  //   }
  // }

  // private setProtonTranslationLocation() {
  //   let translation = [];
  //   this.electronShells.forEach((shell, i) => {
  //     for (let j = 0; j < shell; j++) {
  //       this.p.x = Math.cos(MATH.randomIntFromRange(-1, 1)) * Math.cos(MATH.randomIntFromRange(-1, 1)) * MATH.randomIntFromZeroToRange(4);
  //       this.p.y = Math.sin(MATH.randomIntFromRange(-1, 1)) * Math.cos(MATH.randomIntFromRange(-1, 1)) * MATH.randomIntFromZeroToRange(4);
  //       this.p.z = Math.sin(MATH.randomIntFromRange(-1, 1)) * MATH.randomIntFromZeroToRange(4);
  //       translation.push(this.p.x, this.p.z, this.p.y);
  //     }
  //   })
  //   this.protranslation = new Float32Array(translation);
  // }

  private setAttribLoc(): void {
    this.attr.position = this.gl.getAttribLocation(this.program, "aPosition");
    this.attr.normal = this.gl.getAttribLocation(this.program, "aNormal");
    this.attr.translation = this.gl.getAttribLocation(this.program, "aTranslation");
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
      directColor: this.gl.getUniformLocation(this.program, 'directColor'),
      scale: this.gl.getUniformLocation(this.program, 'scale'),
      opacity: this.gl.getUniformLocation(this.program, 'opacity')
    }
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
    const pBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, pBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, 2 * vertices.length * Float32Array.BYTES_PER_ELEMENT, this.gl.STATIC_DRAW);
    //spherical data for the nucleus
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
    //spherical data for the orbiting electrons
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, vertices.length * Float32Array.BYTES_PER_ELEMENT, new Float32Array(vertices.map(v => v * 4)));
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
    this.gl.vertexAttribPointer(this.attr.translation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.attr.translation);
    this.gl.vertexAttribDivisor(this.attr.translation, 1);

    // this.setNucleusTranslationLocation();
    // this.setProtonTranslationLocation();

    const iBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, 2 * indices.length * Uint16Array.BYTES_PER_ELEMENT, this.gl.STATIC_DRAW);
    //model indices for spherical nucleus
    this.gl.bufferSubData(this.gl.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(indices));
    //model indices for spherical electrons
    this.gl.bufferSubData(this.gl.ELEMENT_ARRAY_BUFFER, indices.length * Uint16Array.BYTES_PER_ELEMENT, new Uint16Array(indices));
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

    //drawing the neutrons
    // this.gl.enable(this.gl.BLEND);
    // this.gl.disable(this.gl.DEPTH_TEST);
    // this.gl.uniform1f(this.unifs.scale, 2.0);
    // this.gl.uniform1f(this.unifs.opacity, 1.0);
    // this.gl.uniform3fv(this.unifs.color, [117/255, 0, 173/255], 0);
    // this.gl.bufferData(this.gl.ARRAY_BUFFER, this.nuctranslation, this.gl.DYNAMIC_DRAW)
    // this.gl.drawElementsInstanced(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0, this.atomicNumber);
    // //drawing the protons
    // this.gl.enable(this.gl.DEPTH_TEST);
    // this.gl.disable(this.gl.BLEND);
    // this.gl.uniform3fv(this.unifs.color, [255/255, 0, 173/255], 0);
    // this.gl.uniform1f(this.unifs.opacity, 1);
    // this.gl.bufferData(this.gl.ARRAY_BUFFER, this.protranslation, this.gl.DYNAMIC_DRAW)
    // this.gl.drawElementsInstanced(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0, this.atomicNumber);

    //drawing the nucleus
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.disable(this.gl.BLEND);
    this.gl.uniform3fv(this.unifs.color, [255/255, 0, 173/255], 0);
    this.gl.uniform1f(this.unifs.scale, 2 + Math.sqrt(this.atomicNumber/15));
    this.gl.uniform1f(this.unifs.opacity, 1);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.nucTranslation, this.gl.DYNAMIC_DRAW)
    this.gl.drawElementsInstanced(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0, 1);

    //drawing the electrons
    this.setElectronTranslationLocation(time);
    this.gl.uniform1f(this.unifs.scale, 0.6);
    this.gl.uniform1f(this.unifs.opacity, 1);
    this.gl.uniform3fv(this.unifs.color, [0.9, 0.9, 0.1], 0);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.translation), this.gl.DYNAMIC_DRAW)
    this.translation = [];
    this.gl.drawElementsInstanced(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, indices.length, this.atomicNumber);

    this.animation = requestAnimationFrame(this.animate.bind(this));
  }

  ngOnDestroy(): void {
    window.cancelAnimationFrame(this.animation);
  }
}
