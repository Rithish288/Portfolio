import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { glMatrix, mat4 } from 'gl-matrix';
import { MATH } from 'math-extended';
import { WebglBoilerPlateService } from 'src/app/services/webgl-boiler-plate.service';
import { lastValueFrom } from 'rxjs';
import { ShaderService } from 'src/app/services/shader.service';
import { CommonVariablesService } from 'src/app/services/common-variables.service';
import { Matrices, Uniforms } from 'src/app/interfaces';


@Component({
  selector: 'app-space',
  template: `
    <canvas #canvas (touchend)="previousTouch = null" (touchmove)="onTouchMove($event)" (mousemove)="onMouseMove($event)" (window:resize)="onResize()"></canvas>
  `,
  styles: [
    ':host {display: block}',
    ':host {width: auto}',
    ':host {height: auto}',
    ':host {box-shadow: inset 0 0 10px -5px black}'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpaceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement>;
  private gl: WebGL2RenderingContext;
  private aspect: number;
  private vertices: number[] = [];
  private program: WebGLProgram;
  private matrices: Matrices
  private buffer: WebGLBuffer;
  private angleX: number = 0;
  private angleY: number = 0;
  private unifs: Uniforms;
  private vertShader: string = '';
  private fragShader: string = '';
  private animation: number = 0;
  private runAnimation: boolean = true;
  public previousTouch: Touch;

  constructor(private shader: ShaderService, private common: CommonVariablesService, private detector: ChangeDetectorRef) {
    this.matrices = WebglBoilerPlateService.generateMatrices();
  }

  ngAfterViewInit(): void {
    this.gl = this.canvas.nativeElement.getContext('webgl2');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.aspect = this.canvas.nativeElement.width / this.canvas.nativeElement.height;
    this.gl.viewport(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.frontFace(this.gl.CCW);
    this.gl.cullFace(this.gl.BACK);
    this.buffer = this.gl.createBuffer();
    this.getShaders().then(this.initGL.bind(this));
    this.common.parentDiv.nativeElement.onscroll = () => this.stopAnimationOffScreen();
  }

  private stopAnimationOffScreen() {
    this.runAnimation = this.common.isInViewport(this.canvas.nativeElement, {
      top: -100, bottom: window.innerHeight + window.innerWidth
    }).visible;
    this.detector.detectChanges();
  }

  private async getShaders(): Promise<void> {
    this.vertShader = await lastValueFrom(this.shader.getSpaceShaders().vertex);
    this.fragShader = await lastValueFrom(this.shader.getSpaceShaders().fragment);
  }

  public onTouchMove(e: TouchEvent) {
    let touch = e.touches[0];
    if(this.previousTouch) {
      e["movementX"] = touch.pageX - this.previousTouch.pageX;
      e["movementY"] = touch.pageY - this.previousTouch.pageY;
      this.angleX += e["movementX"]
      this.angleY -= e["movementY"]
    }
    this.previousTouch = touch;
  }

  private pushVerts(): void {
    for (let i = 10000; i >= 1; i--) {
      this.vertices.push(MATH.randomIntFromRange(-6, 6));
      this.vertices.push(MATH.randomIntFromRange(-6, 6));
      this.vertices.push(MATH.randomIntFromRange(-6, 6));
    }
  }


  private setUniforms(): void {
    this.unifs = {
      matWorld: this.gl.getUniformLocation(this.program, 'mWorld'),
      matView: this.gl.getUniformLocation(this.program, 'mView'),
      matProj: this.gl.getUniformLocation(this.program, 'mProjection'),
      timePeriod: this.gl.getUniformLocation(this.program, 'u_time'),
      resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
      color: 0
    };
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniformMatrix4fv(this.unifs.matView, false, this.matrices.viewMatrix);
    this.gl.uniformMatrix4fv(this.unifs.matProj, false, this.matrices.projMatrix);
    this.gl.uniform2fv(this.unifs.resolution, [this.canvas.nativeElement.width, this.canvas.nativeElement.height], 0);
  }

  public onResize(): void {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.aspect = this.canvas.nativeElement.width / this.canvas.nativeElement.height;
  }

  private setBuffers(): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
  }


  private enableAttribs(): void {
    const position: number = this.gl.getAttribLocation(this.program, 'vPosition');
    this.gl.vertexAttribPointer(
      position,
      3, this.gl.FLOAT,
      false,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    this.gl.enableVertexAttribArray(position);
  }

  private matrixMults(): void {
    mat4.identity(this.matrices.worldMatrix);
    mat4.lookAt(this.matrices.viewMatrix, [0, 0, 0], [0, 0, 0], [0, 0, 0]);
    mat4.perspective(this.matrices.projMatrix, glMatrix.toRadian(45), this.aspect, 0.1, 1000.0);
    mat4.identity(this.matrices.identityMatrix);
  }

  initGL() {
    this.pushVerts();
    this.program = WebglBoilerPlateService.createProgram(
      this.gl,
      WebglBoilerPlateService.createShader(this.gl, this.vertShader, "vertex"),
      WebglBoilerPlateService.createShader(this.gl, this.fragShader, "fragment")
    );
    this.gl.useProgram(this.program);

    this.setBuffers();
    this.enableAttribs();
    this.matrixMults();
    this.setUniforms();
    this.animate();
  }

  onMouseMove($event: MouseEvent) {
    if (!$event.buttons) return
    this.angleX -= $event.movementX;
    this.angleY -= $event.movementY;
  }

  animate(time?: number) {
    this.animation = requestAnimationFrame(this.animate.bind(this));
    if(!this.runAnimation) return
    mat4.rotate(this.matrices.yrotation, this.matrices.identityMatrix, this.angleX / 500, [0, 1, 0]);
    mat4.rotate(this.matrices.xrotation, this.matrices.identityMatrix, this.angleY / 500, [1, 0, 0]);
    mat4.mul(this.matrices.worldMatrix, this.matrices.xrotation, this.matrices.yrotation);
    this.gl.uniformMatrix4fv(this.unifs.matWorld, false, this.matrices.worldMatrix);
    this.gl.uniform1f(this.unifs.timePeriod, time / 1000.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.POINTS, 0, this.vertices.length/2);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animation);
  }
}
