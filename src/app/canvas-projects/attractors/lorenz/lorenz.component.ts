import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ShaderService } from 'app/services/shader.service';
import { Attractor } from '../attractor';

@Component({
  selector: 'lorenz-attractor',
  templateUrl: './lorenz.component.html',
  styleUrls: ['./lorenz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LorenzComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  // private rho = 0.1 + Math.floor(Math.random() * 50);
  // private sigma = 0.1 + Math.floor(Math.random() * 50);
  // private beta = 0.1 + Math.random() * 5;
  private rho = 28;
  private sigma = 10;
  private beta = 8/3;
  private coords = {
    x: 0.1,
    y: 0,
    z: 0.1
  }
  private vertices: number[] = [];
  public title: string = '';
  public attractor: Attractor;
  constructor(private shader: ShaderService) { }
  ngAfterViewInit(): void {
    this.pushVertices();
    this.attractor = new Attractor(this.canvas.nativeElement, this.vertices, -this.rho * 5, WebGL2RenderingContext.LINE_STRIP, this.shader);
    this.attractor.setCanvas();
    this.attractor.start();
  }

  pushVertices() {
    let x: number = this.coords.x, y: number = this.coords.y, z: number = this.coords.z;
    let dx: number, dy: number, dz: number, dt = 0.009;

    for (let i = 1e4; i > 0; i--) {
      dx = this.sigma * (y - x) * dt;
      dy = (x * (this.rho - z) - y) * dt;
      dz = (x * y - this.beta * z) * dt;

      x += dx;
      y += dy;
      z += dz;

      this.vertices.push(x, y, z);
    }
  }

  ngOnDestroy(): void {
    this.vertices = [];
    cancelAnimationFrame(this.attractor.animation);
    this.attractor.deleteBuffer();
  }

}
