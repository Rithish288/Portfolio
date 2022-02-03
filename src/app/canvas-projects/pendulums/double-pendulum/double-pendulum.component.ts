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
  private audio: AudioContext = new AudioContext();
  private osc: OscillatorNode;
  private gain: GainNode;
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
    this.gain = this.audio.createGain();
    this.gain.connect(this.audio.destination);
    // this.gain.connect(this.audio.destination);
  }

  start() {
    this.audio.resume()
    this.osc = this.audio.createOscillator();
    this.osc.connect(this.gain);
    // this.osc.type = 'sine';
    this.osc.start(0);
    // this.gain.gain.exponentialRampToValueAtTime(0.00001, this.audio.currentTime + 3);
    // this.osc.disconnect(this.audio.destination)
  }

  stop() {
    this.gain.gain.exponentialRampToValueAtTime(0.00001, this.audio.currentTime + 3);
    this.osc = null;
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
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.c.translate(0, this.canvas.nativeElement.height/4);
    this.pendulum.length.bob1 = this.length.one = this.canvas.nativeElement.width / 6.5;
    this.pendulum.length.bob2 = this.length.two = this.canvas.nativeElement.width / 6.5;
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
