import { Inject, Injectable, OnDestroy } from "@angular/core";
import { mat4 } from "gl-matrix";
import { MATH } from "math-extended";
import { lastValueFrom } from "rxjs";
import { primaryMappedArr } from "app/colors";
import { ShaderService } from "app/services/shader.service";
import { WebglBoilerPlateService } from "app/services/webgl-boiler-plate.service";
import { Uniforms } from "app/interfaces";

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
  private currentAngle: number = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    @Inject(Array) public vertices: number[],
    @Inject(Number) private zScale: number,
    @Inject(String) private drawMode: WebGL2RenderingContext["TRIANGLES"] | WebGL2RenderingContext["LINES"] | WebGL2RenderingContext["POINTS"] | WebGL2RenderingContext["LINE_STRIP"],
    private shader: ShaderService,
    @Inject(Array) private color?: number[]
  ) {
    this.gl = this.canvas.getContext("webgl2", {preserveDrawingBuffer: false});
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
      this.canvas.onmouseup = this.onMouseUp.bind(this);
      this.canvas.ontouchend = (ev: TouchEvent) => {
        this.previousTouch = null;
        this.onMouseUp(ev);
      };
    });
  }

  private onResize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.aspect = this.canvas.width / this.canvas.height;
    mat4.perspective(this.matrices.projMatrix, MATH.degToRad(45), this.aspect, 0.1, MATH.arithmetics.pow(10, 100));
    this.gl.uniformMatrix4fv(this.unifs.matProj, false, this.matrices.projMatrix)
  }

  private async getShaders(): Promise<void> {
    this.fragShader = await lastValueFrom(this.shader.getAttractorShaders().fragment);
    this.vertShader = await lastValueFrom(this.shader.getAttractorShaders().vertex);
  }

  private initProgram(): void {
    this.program = WebglBoilerPlateService.createProgram(
      this.gl,
      WebglBoilerPlateService.createShader(this.gl, this.vertShader, "vertex"),
      WebglBoilerPlateService.createShader(this.gl, this.fragShader, "fragment")
    );
    this.gl.useProgram(this.program);
  }

  private setUniforms(): void {
    this.unifs = {
      matWorld: this.gl.getUniformLocation(this.program, "mWorld"),
      matView: this.gl.getUniformLocation(this.program, "mView"),
      matProj: this.gl.getUniformLocation(this.program, "mProjection"),
      timePeriod: this.gl.getUniformLocation(this.program, "u_time"),
      resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
      color: this.gl.getUniformLocation(this.program, "color"),
      scale: this.gl.getUniformLocation(this.program, "scale")
    }
    this.color?
      this.gl.uniform3fv(this.unifs.color, this.color, 0) :
      this.gl.uniform3fv(this.unifs.color, primaryMappedArr, 0);
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniformMatrix4fv(this.unifs.matView, false, this.matrices.viewMatrix);
    this.gl.uniformMatrix4fv(this.unifs.matProj, false, this.matrices.projMatrix);
    this.gl.uniform2fv(this.unifs.resolution, [this.canvas.width, this.canvas.height], 0);
    this.gl.uniform1f(this.unifs.scale, 1);
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

  private onMouseUp(e: MouseEvent | TouchEvent) {
    setTimeout(() => {
      if(this.touch === true) this.touch = false;
      this.currentAngle = this.angleX;
    }, 1000);
  }

  private onTouchMove(e: TouchEvent) {
    let touch = e.touches[0];
    e.stopPropagation();
    this.touch = true;
    if(this.previousTouch) {
      e["movementX"] = touch.pageX - this.previousTouch.pageX;
      e["movementY"] = touch.pageY - this.previousTouch.pageY;
      this.angleX += e["movementX"];
      this.angleY -= e["movementY"];
    }
    this.previousTouch = touch;
  }

  private rotation() {
    if(!this.touch) {
      this.currentAngle += 5;
      this.angleX = this.currentAngle;
      mat4.rotate(this.matrices.yrotation, this.matrices.identityMatrix, this.angleX/300, [0, 1, 0]);
    } else
      mat4.rotate(this.matrices.yrotation, this.matrices.identityMatrix, this.angleX/300, [0, 1, 0]);
    mat4.rotate(this.matrices.xrotation, this.matrices.identityMatrix, this.angleY/300, [1, 0, 0]);
  }

  private animate(time?: number): void {
    this.rotation();
    mat4.mul(this.matrices.worldMatrix, this.matrices.xrotation, this.matrices.yrotation);

    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniform1f(this.unifs.timePeriod, time / 1000.0);

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.drawMode, 0, this.vertices.length/3)
    this.animation = requestAnimationFrame(this.animate.bind(this));
  }
}

