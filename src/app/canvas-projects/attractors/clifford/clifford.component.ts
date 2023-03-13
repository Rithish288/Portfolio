import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { MATH } from 'math-extended';
import { lastValueFrom } from 'rxjs';
import { primaryMappedArr } from 'app/colors';
import { ShaderService } from 'app/services/shader.service';
import { WebglBoilerPlateService } from 'app/services/webgl-boiler-plate.service';

@Component({
  selector: 'clifford-attractor',
  templateUrl: './clifford.component.html',
  styleUrls: ['./clifford.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CliffordComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  private gl: WebGL2RenderingContext;
  private vertices: number[] = [0, 0]
  private animation: number = 0;
  private program: WebGLProgram;
  private vertShader: string;
  private fragShader: string;
  private buffer: WebGLBuffer;
  private time: WebGLUniformLocation;
  public shaderVars: Partial<{a: WebGLUniformLocation, b: WebGLUniformLocation, c: WebGLUniformLocation, d: WebGLUniformLocation}> = {};
  // public variables = {
  //   a: parseFloat((MATH.randomIntFromRange(-3, 3)).toPrecision(2)),
  //   b: parseFloat((MATH.randomIntFromRange(-3, 3)).toPrecision(2)),
  //   c: parseFloat((MATH.randomIntFromRange(-3, 3)).toPrecision(2)),
  //   d: parseFloat((MATH.randomIntFromRange(-3, 3)).toPrecision(2))
  // }
  public variables = {
    a: -1.24,
    b: -1.25,
    c: -1.81,
    d: -1.90
  }

  constructor(private shader: ShaderService) { }
  ngAfterViewInit(): void {
    this.gl = this.canvas.nativeElement.getContext('webgl2');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.startCanvas();
  }

  private async setupShaders(): Promise<void> {
    this.fragShader = await lastValueFrom(this.shader.getCliffordAttractorShaders().fragment);
    this.vertShader = await lastValueFrom(this.shader.getCliffordAttractorShaders().vertex);
  }

  private startCanvas(): void {
    this.setupShaders().then(() => {
      this.setProgram();

      this.gl.useProgram(this.program);
      this.setUniforms();
      this.gl.useProgram(null);

      this.setVertices();
      this.setBuffer();

      this.gl.useProgram(this.program);
      const position = this.gl.getAttribLocation(this.program, 'a_position');
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
      this.gl.enableVertexAttribArray(position);
      this.gl.vertexAttribPointer(position, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
      this.animate();
    })
  }

  private setUniforms(): void {
    this.setColor();
    this.time = this.gl.getUniformLocation(this.program, 'u_time');
    const pointSize = this.gl.getUniformLocation(this.program, 'uPointSize');
    this.shaderVars.a = this.gl.getUniformLocation(this.program, 'a');
    this.shaderVars.b = this.gl.getUniformLocation(this.program, 'b');
    this.shaderVars.c = this.gl.getUniformLocation(this.program, 'c');
    this.shaderVars.d = this.gl.getUniformLocation(this.program, 'd');
    this.gl.uniform1f(pointSize, 1);
    this.gl.uniform1f(this.shaderVars.a, this.variables.a);
    this.gl.uniform1f(this.shaderVars.b, this.variables.b);
    this.gl.uniform1f(this.shaderVars.c, this.variables.c);
    this.gl.uniform1f(this.shaderVars.d, this.variables.d);
  }

  private setColor(): void {
    const color = this.gl.getUniformLocation(this.program, 'color');
    this.gl.uniform3fv(color, primaryMappedArr, 0);
  }

  private setProgram(): void {
    this.program = WebglBoilerPlateService.createProgram(
      this.gl,
      WebglBoilerPlateService.createShader(this.gl, this.vertShader, 'vertex'),
      WebglBoilerPlateService.createShader(this.gl, this.fragShader, 'fragment')
    );
  }

  private setVertices(): void {
    let x: number = this.vertices[0], y: number = this.vertices[0];
    if(this.variables.a !== 0)
    for (let i = 0; i < 1e5 ; i++) {
      x = Math.sin(this.variables.a*y) + this.variables.c * Math.cos(this.variables.a*x)
      y = Math.sin(this.variables.b*x) + this.variables.d * Math.cos(this.variables.b*y)
      this.vertices.push(x, y);
    }
  }

  private setBuffer(): void {
    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  // onResize() {
  //   window.onresize = () => {
  //     this.canvas.nativeElement.width = window.innerWidth;
  //     this.canvas.nativeElement.height = window.innerHeight;
  //     this.gl.viewport(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  //   }
  // }

  public onValueChange(value: MatSliderChange, param: string) {
    this.gl.uniform1f(this.shaderVars[param], value.value);
    this.variables[param] = value.value
  }

  private animate(): void {
    this.animation = requestAnimationFrame(this.animate.bind(this));
    this.gl.uniform1f(this.time, this.animation);
    this.gl.drawArrays(this.gl.POINTS, 0, this.vertices.length/3)
  }


  ngOnDestroy(): void {
    cancelAnimationFrame(this.animation);
    this.gl.deleteBuffer(this.buffer);
    this.gl.deleteProgram(this.program);
  }
}
