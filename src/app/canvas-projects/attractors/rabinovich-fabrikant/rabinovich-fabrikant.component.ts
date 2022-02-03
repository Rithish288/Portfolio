import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ShaderService } from 'src/app/services/shader.service';
import { Attractor } from '../attractor';

@Component({
  selector: 'app-rabinovich-fabrikant',
  templateUrl: './rabinovich-fabrikant.component.html',
  styleUrls: ['./rabinovich-fabrikant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RabinovichFabrikantComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private coords = {
    x: -1.0,
    y: 0,
    z: 0.5
  }
  private variables = {
    alpha: 0.1, gamma: 0.2715
  }
  private vertices: number[] = [];
  public title: string = '';
  public attractor: Attractor;
  constructor(private shader: ShaderService) { }
  ngAfterViewInit(): void {
    this.pushVertices();
    this.attractor = new Attractor(this.canvas.nativeElement, this.vertices, -20, WebGL2RenderingContext.LINE_STRIP, this.shader);
    this.attractor.setCanvas();
    this.attractor.start();
  }

  pushVertices() {
    let x: number = this.coords.x, y: number = this.coords.y, z: number = this.coords.z;
    let dx: number, dy: number, dz: number, dt = 0.00035;
    for (let i = 0; i < 50000; i++) {
      dx = y * (z - 1 + x ** 2) + this.variables.gamma * x;
      dy = x * (3 * z + 1 - x ** 2) + this.variables.gamma * y;
      dz = -2 * z * (this.variables.alpha + x * y);

      x += dx * dt;
      y += dy * dt;
      z += dz * dt;

      this.vertices.push(x, z, y);
    }
  }

  ngOnDestroy(): void {
    this.vertices = [];
    cancelAnimationFrame(this.attractor.animation);
    this.attractor.deleteBuffer();
  }

}
