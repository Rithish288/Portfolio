import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { primaryColor, primaryGrey } from 'src/app/colors';
import { PendulumService } from 'src/app/services/pendulum.service';

@Component({
  selector: 'app-triple-pendulum',
  templateUrl: './triple-pendulum.component.html',
  styleUrls: ['./triple-pendulum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriplePendulumComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private c: CanvasRenderingContext2D;
  private pendulum: PendulumService;
  constructor() { }

  ngAfterViewInit(): void {
    let n = 10;
    this.pendulum = new PendulumService(n, Array(n).fill(Math.PI/2), Array(n).fill(0), -9.8)
    this.canvas.nativeElement.width = Math.min(window.innerHeight, window.innerWidth);
    this.canvas.nativeElement.height = Math.min(window.innerHeight, window.innerWidth);
    this.c = this.canvas.nativeElement.getContext('2d');
    this.c.fillStyle = primaryColor;
    this.c.strokeStyle = primaryGrey;
    this.c.lineWidth = 2;
    this.animate()
  }

  onResize(){
    this.canvas.nativeElement.width = Math.min(window.innerHeight, window.innerWidth);
    this.canvas.nativeElement.height = Math.min(window.innerHeight, window.innerWidth);
    this.c.fillStyle = primaryColor;
    this.c.strokeStyle = primaryGrey;
  }

  draw() {
    let coords = this.pendulum.Coordinates;
    let x1 = this.canvas.nativeElement.width/2;
    let y1 = this.canvas.nativeElement.height/4;

    for (let i = 0; i < this.pendulum.n; i++) {
      let x2 = this.canvas.nativeElement.width/2 + (coords[i].x * (this.canvas.nativeElement.width/2/this.pendulum.n));
      let y2 = this.canvas.nativeElement.height/4 + (coords[i].y * (this.canvas.nativeElement.height/2/this.pendulum.n));

      this.c.beginPath();
      this.c.moveTo(x1, y1);
      this.c.lineTo(x2, y2);
      this.c.stroke();

      this.c.beginPath();
      this.c.arc(x2, y2, 8, 0, Math.PI * 2, true);

      this.c.fill();
      x1 = x2;
      y1 = y2;
    }

  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
    this.draw();
    this.pendulum.tick(1/60)
  }

}
