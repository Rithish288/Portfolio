import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import { ShaderService } from 'src/app/services/shader.service';
import { Attractor } from '../attractor';

@Component({
  selector: 'four-wing-attractor',
  templateUrl: './four-wing.component.html',
  styleUrls: ['./four-wing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FourWingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private params = {
    a: 0.2, b: -0.01, c: 1,
    d: -0.4, e: -1, f: -1
  }
  private coords = {
    x: 1.3, y: -0.18, z: 0.1
  }
  private vertices: number[] = [];
  public title: string = '';
  public attractor: Attractor;
  constructor(private shader: ShaderService) { }
  ngAfterViewInit(): void {
    this.pushVertices();
    this.attractor = new Attractor(this.canvas.nativeElement, this.vertices, -10, WebGL2RenderingContext.LINE_STRIP, this.shader);
    this.attractor.setCanvas();
    this.attractor.start();
  }

  pushVertices() {
    let x = this.coords.x, y = this.coords.y, z = this.coords.z;
    let dx: number, dy: number, dz: number, dt = 0.009;
    for (let i = 1e4; i > 0; i -= 0.01) {
      dx = this.params.a * x + this.params.c * y * z;
      dy = this.params.b * x + this.params.d * y - x * z;
      dz = this.params.e * z + this.params.f * x * y;

      x += dx * dt;
      z += dz * dt;
      y += dy * dt;

      this.vertices.push(x, y, z);

    }
  }

  ngOnDestroy(): void {
    this.vertices = [];
    cancelAnimationFrame(this.attractor.animation);
    this.attractor.deleteBuffer();
  }

}
