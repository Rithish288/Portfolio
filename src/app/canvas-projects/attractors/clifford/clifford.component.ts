import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { WebglBoilerPlateService } from 'src/app/services/webgl-boiler-plate.service';
import { MATH } from 'math-extended';
import { primaryColor } from 'src/app/colors';

@Component({
  selector: 'app-clifford',
  templateUrl: './clifford.component.html',
  styleUrls: [
    './clifford.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CliffordComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;
  c: CanvasRenderingContext2D;
  public title: string = '';
  private radius: number = 1.2;
  private i: number = 0;
  animation: number = 0;
  steps: number = 5000;
  x: Array<number> = [];
  y: Array<number> = [];
  variables = {
    a: MATH.randomIntFromRange(-3.0, 3.5), b: MATH.randomIntFromRange(-3.0, 3.5), c: 0.0, d: 0.0
  }

  constructor() { }
  ngAfterViewInit(): void {
    this.c = this.canvas.nativeElement.getContext('2d');
    this.c.canvas.width = window.innerWidth;
    this.c.canvas.height = window.innerHeight;
    this.c.fillStyle = primaryColor
    this.x[this.i] = 0;
    this.y[this.i] = 0;
    this.increment();
  }

  onResize() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.c.fillStyle = primaryColor
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animation);
    this.x = [];
    this.y = [];
  }

  increment() {
    this.animation = requestAnimationFrame(() => this.increment());
    this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
    this.variables.d = Math.cos(this.animation / 350) * 1.5;
    this.variables.c = Math.sin(this.animation / 350) * 1.5;
    for (this.i = this.steps; 1 < this.i; this.i--) {
      this.x[this.i] =
        Math.sin(this.variables.a*this.y[this.i-3])
        + this.variables.c * Math.cos(this.variables.a*this.x[this.i-3]);
      this.y[this.i] =
        Math.sin(this.variables.b*this.x[this.i-3])
        + this.variables.d * Math.cos(this.variables.b*this.y[this.i-3]);
      this.c.beginPath();
      this.c.arc(
        Math.floor(this.x[this.i] * window.innerWidth/7 + this.c.canvas.width/2),
        Math.floor(this.y[this.i] * window.innerHeight/7 + this.c.canvas.height/2),
        this.radius, 0, Math.PI * 2, false
      );
      this.c.fill();
    }
  }
}
