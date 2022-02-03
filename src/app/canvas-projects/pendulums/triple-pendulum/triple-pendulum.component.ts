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
  constructor() { }

  ngAfterViewInit(): void {
  }

  onResize(){

  }

}
