import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ShaderService } from 'src/app/services/shader.service';
import { Attractor } from '../attractor';

@Component({
  selector: 'aizawa-attractor',
  templateUrl: './aizawa.component.html',
  styleUrls: ['./aizawa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AizawaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private coords = {
    x: 0.1,
    y: 0,
    z: 0
  }
  private variables = {
    // a: parseFloat(Math.random().toPrecision(5)), b: parseFloat(Math.random().toPrecision(5)), c: parseFloat(Math.random().toPrecision(5)),
    // d: parseFloat(Math.random().toPrecision(5))*5, e: parseFloat(Math.random().toPrecision(5)), f: parseFloat(Math.random().toPrecision(5))
    a: 0.95, b: 0.7, c: 0.6, d: 3.5, e: 0.25, f: 0.1
  }
  private vertices: number[] = [];
  public title: string = '';
  public attractor: Attractor;
  constructor(private shader: ShaderService) { }
  ngAfterViewInit(): void {
    this.pushVertices();
    this.attractor = new Attractor(this.canvas.nativeElement, this.vertices, -6, WebGL2RenderingContext.LINE_STRIP, this.shader);
    this.attractor.setCanvas();
    this.attractor.start();
  }

  pushVertices() {
    let x: number = this.coords.x, y: number = this.coords.y, z: number = this.coords.z;
    let dx: number, dy: number, dz: number, dt = 0.01;
    for (let i = 2e4; i >= 0 ; i--) {
      dx = (z - this.variables.b) * x - this.variables.d * y;
      dy = this.variables.d * x + (z - this.variables.b) * y;
      dz = this.variables.c + this.variables.a * z - z**3 / 3 - (x**2 + y**2) * (1 + this.variables.e * z) + this.variables.f * z * x**3;

      x += dx * dt;
      z += dz * dt;
      y += dy * dt;

      this.vertices.push(x, z, y)
    }
  }

  ngOnDestroy(): void {
    this.vertices = [];
    cancelAnimationFrame(this.attractor.animation);
    this.attractor.deleteBuffer();
  }

}
