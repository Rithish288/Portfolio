import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ShaderService } from 'app/services/shader.service';
import { Attractor } from '../attractor';

@Component({
  selector: 'thomas-attractor',
  templateUrl: './thomas.component.html',
  styleUrls: ['./thomas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThomasComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private b = 0.208186;
  private coords = {
    x: 1.1, y: 1.1, z: -0.01
  }
  private vertices: number[] = [];
  public title: string = '';
  private attractor: Attractor;
  constructor(private shader: ShaderService) { }
  ngAfterViewInit(): void {
    this.pushVertices();
    this.attractor = new Attractor(this.canvas.nativeElement, this.vertices, -15, WebGL2RenderingContext.LINE_STRIP, this.shader);
    this.attractor.setCanvas();
    this.attractor.start();
  }

  pushVertices() {
    let x = this.coords.x, y = this.coords.y, z = this.coords.z;
    let dx:number, dy:number, dz: number, dt = 0.9;
    for (let i = 0; i < 7000; i++) {
      dx = Math.sin(y) - this.b * x;
      dy = Math.sin(z) - this.b * y;
      dz = Math.sin(x) - this.b * z;
      x += dx * dt;
      y += dy * dt;
      z += dz * dt;

      this.vertices.push(x, y, z);
    }
  }

  ngOnDestroy(): void {
    this.vertices = [];
    cancelAnimationFrame(this.attractor.animation);
    this.attractor.deleteBuffer();
  }

}
