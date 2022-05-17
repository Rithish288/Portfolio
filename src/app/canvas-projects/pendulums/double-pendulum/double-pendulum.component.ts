import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MATH } from 'math-extended';
import { primaryColor } from 'src/app/colors';
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
      {length: this.length.one, angle: MATH.randomIntFromRange(-MATH.degToRad(90), MATH.degToRad(90)), mass: 10},
      {length: this.length.two, angle: MATH.randomIntFromRange(-MATH.degToRad(90), MATH.degToRad(90)), mass: 10}
    );
    // this.pendulum2 = new DoublePendulum(
    //   this.canvas.nativeElement,
    //   this.canvas.nativeElement.width / 95,
    //   primaryColor,
    //   {length: this.length.one + 10, angle: Math.PI / 2 + 1, mass: 10},
    //   {length: this.length.two - 10, angle: Math.PI / 2, mass: 10}
    // );
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

    // this.pendulum2.length.bob1 = this.length.one = this.canvas.nativeElement.width / 6.5;
    // this.pendulum2.length.bob2 = this.length.two = this.canvas.nativeElement.width / 6.5;
    // this.pendulum2.radius = this.canvas.nativeElement.width / 95;
  }

  private animate() {
    this.animation = requestAnimationFrame(this.animate.bind(this));
    this.c.clearRect(0, -500, this.canvas.nativeElement.width, this.canvas.nativeElement.height * 4);
    this.pendulum.update();
    // this.pendulum2.update();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animation);
  }

}
