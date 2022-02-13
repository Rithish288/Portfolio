import { Inject, Injectable, OnDestroy } from "@angular/core";
import { mat4 } from "gl-matrix";
import { MATH } from "math-extended";
import { lastValueFrom } from "rxjs";
import { primaryMappedArr } from "src/app/colors";
import { ShaderService } from "src/app/services/shader.service";
import { WebglBoilerPlateService } from "src/app/services/webgl-boiler-plate.service";


interface Uniforms {
  matWorld: WebGLUniformLocation
  matView: WebGLUniformLocation
  matProj: WebGLUniformLocation
  timePeriod: WebGLUniformLocation
  resolution: WebGLUniformLocation
  color: WebGLUniformLocation
}

@Injectable()

export class Attractor implements OnDestroy {
  public animation: number = 0;
  private buffer: WebGLBuffer;
  private gl: WebGL2RenderingContext;
  private aspect: number;
  private program: WebGLProgram;
  private matrices = {
    xrotation: new Float32Array(16),
    yrotation: new Float32Array(16),
    identityMatrix: new Float32Array(16),
    worldMatrix: new Float32Array(16),
    viewMatrix: new Float32Array(16),
    projMatrix: new Float32Array(16)
  }
  private angleX: number = 0;
  private angleY: number = 0;
  private unifs: Uniforms;
  private vertShader: string = '';
  private fragShader: string = '';
  private touch: boolean;
  private previousTouch: Touch;

  constructor(
    private canvas: HTMLCanvasElement,
    @Inject(Array) private vertices: number[],
    @Inject(Number) private zScale: number,
    @Inject(String) private drawMode: WebGL2RenderingContext["TRIANGLES"] | WebGL2RenderingContext["LINES"] | WebGL2RenderingContext["POINTS"] | WebGL2RenderingContext["LINE_STRIP"],
    private shader: ShaderService,
    @Inject(Array) private color?: number[],
    @Inject(Array) private indices?: number[]
  ) {
    this.gl = this.canvas.getContext('webgl2', {preserveDrawingBuffer: false});
    this.buffer = this.gl.createBuffer();
  }
  ngOnDestroy(): void {
    this.vertices = [];
  }

  public setCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.aspect = this.canvas.width / this.canvas.height;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  public start(): void {
    this.getShaders().then(this.initGL.bind(this)).then(() => {
      this.canvas.onmousemove = this.onMouseMove.bind(this);
      this.canvas.ontouchmove = this.onTouchMove.bind(this);
      this.canvas.ontouchend = () => this.previousTouch = null;
    });
  }

  private onResize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.aspect = this.canvas.width / this.canvas.height;
  }

  private async getShaders(): Promise<void> {
    this.fragShader = await lastValueFrom(this.shader.getAttractorShaders().fragment);
    this.vertShader = await lastValueFrom(this.shader.getAttractorShaders().vertex);
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
      resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
      color: this.gl.getUniformLocation(this.program, 'color')
    }
    if(this.color) {
    this.gl.uniform3fv(this.unifs.color, this.color, 0);
    } else {
      this.gl.uniform3fv(this.unifs.color, primaryMappedArr, 0);
    }
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix)
    this.gl.uniformMatrix4fv(this.unifs.matView, false, this.matrices.viewMatrix)
    this.gl.uniformMatrix4fv(this.unifs.matProj, false, this.matrices.projMatrix)
    this.gl.uniform2fv(this.unifs.resolution, [this.canvas.width, this.canvas.height], 0);
  }

  private setBuffers(): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
  }

  public deleteBuffer(): void {
    this.gl.deleteBuffer(this.buffer);
  }

  private enableAttribs(): void {
    const position = this.gl.getAttribLocation(this.program, 'vPosition');
    this.gl.vertexAttribPointer(position, 3, this.gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
    this.gl.enableVertexAttribArray(position);
  }

  private matrixMults() {
    mat4.identity(this.matrices.worldMatrix);
    mat4.lookAt(this.matrices.viewMatrix, [0, 0, this.zScale], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(this.matrices.projMatrix, MATH.degToRad(45), this.aspect, 0.1, MATH.arithmetics.pow(10, 100));
    mat4.identity(this.matrices.identityMatrix);
  }

  private initGL(): void {
    this.initProgram();
    this.setBuffers();
    this.enableAttribs();
    this.matrixMults();
    this.setUniforms();
    this.animate();
    window.onresize = this.onResize.bind(this);
  }

  private onMouseMove(e: MouseEvent): void {
    if (e.buttons) {
      this.touch = true;
      this.angleX += e.movementX;
      this.angleY -= e.movementY;
    }
  }

  private onTouchMove(e: TouchEvent) {
    let touch = e.touches[0];
    this.touch = true;
    if(this.previousTouch) {
      e["movementX"] = touch.pageX - this.previousTouch.pageX;
      e["movementY"] = touch.pageY - this.previousTouch.pageY;
      this.angleX += e["movementX"]
      this.angleY -= e["movementY"]
    }
    this.previousTouch = touch;
  }

  private animate(time?: number): void {
    if(!this.touch) {
      mat4.rotate(this.matrices.yrotation, this.matrices.identityMatrix, this.angleX, [0, 1, 0]);
      this.angleX = time/1000;
    }
    else {
      mat4.rotate(this.matrices.yrotation, this.matrices.identityMatrix, this.angleX / 300, [0, 1, 0]);
    }
    mat4.rotate(this.matrices.xrotation, this.matrices.identityMatrix, this.angleY / 300, [1, 0, 0]);
    mat4.mul(this.matrices.worldMatrix, this.matrices.xrotation, this.matrices.yrotation);
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniform1f(this.unifs.timePeriod, time / 1000.0);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    if(this.indices) {
      this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
    } else {
      this.gl.drawArrays(this.drawMode, 0, this.vertices.length/3)
    }
    this.animation = requestAnimationFrame(this.animate.bind(this));
  }
}
