import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { primaryColor } from 'src/app/colors';
import { WebglBoilerPlateService } from 'src/app/services/webgl-boiler-plate.service';
import { DoublePendulum } from './double-pendulum';

@Component({
  selector: 'app-double-pendulum',
  templateUrl: './double-pendulum.component.html',
  styleUrls: ['./double-pendulum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoublePendulumComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private c: CanvasRenderingContext2D;
  private animation: number;
  private pendulum: DoublePendulum;
  private length = {
    one: 10,
    two: 10
  }
  constructor() { }

  ngAfterViewInit(): void {
    this.setup();
    this.pendulum = new DoublePendulum(
      this.canvas.nativeElement,
      this.canvas.nativeElement.width / 95,
      primaryColor,
      this.length.one,
      this.length.two
    );
    this.animate();
  }

  private setup() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.c = this.canvas.nativeElement.getContext('2d');
    this.c.translate(0, this.canvas.nativeElement.height/4);
    this.length.one = this.canvas.nativeElement.width / 6.5;
    this.length.two = this.canvas.nativeElement.width / 6.5;
  }

  onResize() {
    this.c.translate(0, this.canvas.nativeElement.height/4);
    this.pendulum.length.bob1 = this.length.one = this.canvas.nativeElement.width / 6.5;
    this.pendulum.length.bob2 = this.length.two = this.canvas.nativeElement.width / 6.5;
    this.pendulum.radius = this.canvas.nativeElement.width / 95;
  }

  private animate() {
    this.animation = requestAnimationFrame(this.animate.bind(this));
    this.c.clearRect(0, -500, this.canvas.nativeElement.width, this.canvas.nativeElement.height * 4);
    this.pendulum.update();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animation);
  }

}
