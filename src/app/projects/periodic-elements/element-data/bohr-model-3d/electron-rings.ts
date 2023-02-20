import { mat4 } from "gl-matrix";
import { MATH } from "math-extended";
import { lastValueFrom } from "rxjs";
import { Matrices, Uniforms } from "src/app/interfaces";
import { ShaderService } from "src/app/services/shader.service";
import { WebglBoilerPlateService } from "src/app/services/webgl-boiler-plate.service";

export class ElectronRings {
  private fragShader: any;
  private vertShader: any;
  private program: WebGLProgram;
  private matrices: Matrices;
  private buffer: WebGLBuffer;
  private vertices: number[] = [];
  private unifs: Uniforms;
  constructor(private gl: WebGL2RenderingContext, private electronShells: number[], private shader: ShaderService, private data: {zScale: number, aspect: number}) {
    this.matrices = WebglBoilerPlateService.generateMatrices();
  }

  public genRings() {
    this.initProgram();
    this.setUniforms();
    this.generateVertices();
    this.enableAttribs();
    this.matrixMults();
  }

  private generateVertices() {
    let x: number, y: number, angle: number;
    this.electronShells.forEach((shell, i) => {
      i++;
      angle = (Math.PI * 2) / shell;
      for (let j = 0; j < 100; j++) {
        x = Math.cos(angle * j + 0.009/i) * (i/2+1) * 10;
        y = Math.sin(angle * j + 0.009/i) * (i/2+1) * 10;
        this.vertices.push(x, 0, y);
      }
    });
    console.log(this.unifs);
  }

  public start() {
    this.getShaders().then(() => this.genRings());
    return {program: this.program, verts: this.vertices.length};
  }

  public async getShaders(): Promise<void> {
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

  private setUniforms(): void {
    this.unifs = {
      matWorld: this.gl.getUniformLocation(this.program, 'mWorld'),
      matView: this.gl.getUniformLocation(this.program, 'mView'),
      matProj: this.gl.getUniformLocation(this.program, 'mProjection'),
      timePeriod: this.gl.getUniformLocation(this.program, 'u_time'),
      resolution: 0,
      color: this.gl.getUniformLocation(this.program, 'color'),
    }
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniformMatrix4fv(this.unifs.matView, false, this.matrices.viewMatrix);
    this.gl.uniformMatrix4fv(this.unifs.matProj, false, this.matrices.projMatrix);
    this.gl.uniform3fv(this.unifs.color, [0.9, 0.9, 0.1], 0);
  }

  private matrixMults() {
    mat4.identity(this.matrices.worldMatrix);
    mat4.lookAt(this.matrices.viewMatrix, [60, 20, 200-this.data.zScale], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(this.matrices.projMatrix, MATH.degToRad(45), this.data.aspect, 0.1, MATH.arithmetics.pow(10, 10));
    mat4.identity(this.matrices.identityMatrix);
  }

  private enableAttribs(): void {
    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.program, "aPosition"), 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.program, "aPosition"));
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  public setBuffers() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
  }

  public uniformMatrices(): void {
    mat4.lookAt(this.matrices.viewMatrix, [0, (200-this.data.zScale)/4 +1  , 200-this.data.zScale + 1], [0, 0, 0], [0, 1, 0]);
    this.gl.uniformMatrix4fv(this.unifs.matView, false, this.matrices.viewMatrix);
    mat4.mul(this.matrices.worldMatrix, this.matrices.xrotation, this.matrices.yrotation);
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
  }
}
