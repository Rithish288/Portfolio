import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Pendulum } from './triple-pendulum';

@Component({
  selector: 'app-triple-pendulum',
  templateUrl: './triple-pendulum.component.html',
  styleUrls: ['./triple-pendulum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriplePendulumComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private c: CanvasRenderingContext2D;
  private pendulum: Pendulum;
  constructor() { }

  ngAfterViewInit(): void {
    this.c = this.canvas.nativeElement.getContext('2d');
    this.pendulum = new Pendulum(this.canvas.nativeElement, 'blue', 5, 100, 100, 100);
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    // this.c.translate(0, 200)
    this.animate()
  }

  onResize(){

  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
    this.pendulum.update();
  }

}
