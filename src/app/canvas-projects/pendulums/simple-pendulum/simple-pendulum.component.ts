import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { primaryColor } from 'src/app/colors';
import { Pendulum } from './simple-pendulum';

@Component({
  selector: 'app-simple-pendulum',
  templateUrl: './simple-pendulum.component.html',
  styleUrls: ['./simple-pendulum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimplePendulumComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private c: CanvasRenderingContext2D;

  private pendulum: Pendulum;
  private x: number;
  private y: number;
  private animation: number;
  constructor() { }

  ngAfterViewInit(): void {
    this.setup();
    this.pendulum = new Pendulum(
      this.canvas.nativeElement, this.x, this.y, 20, primaryColor, 200
    );
    this.animate();
  }

  private setup() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.c = this.canvas.nativeElement.getContext('2d');
    this.x = this.canvas.nativeElement.width / 2;
    this.y = this.canvas.nativeElement.height / 4;
  }

  onResize() {
    this.x = this.canvas.nativeElement.width / 2;
    this.y = this.canvas.nativeElement.height / 4;
    this.pendulum.initX = this.x;
    this.pendulum.initY = this.y;
  }

  private animate() {
    this.animation = requestAnimationFrame(this.animate.bind(this));
    this.c.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.pendulum.update();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animation);
  }
}
