import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { fadeIn } from '../animations';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-canvas-projects',
  templateUrl: './canvas-projects.component.html',
  styleUrls: ['./canvas-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn]
})
export class CanvasProjectsComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private c: CanvasRenderingContext2D;
  public attractors = [
    {path: "attractors/aizawa", name: 'Aizawa Attractor', truncateLength: 0},
    {path: "attractors/clifford", name: 'Clifford Attractor', truncateLength: 0},
    {path: "attractors/four-wing", name: 'Four Wing Attractor', truncateLength: 0},
    {path: "attractors/lorenz", name: 'Lorenz Attractor', truncateLength: 0},
    {path: "attractors/rabinovich-fabrikant", name: 'Rabinovich Fabrikant Attractor', truncateLength: 13},
    {path: "attractors/thomas", name: 'Thomas Attractor', truncateLength: 0}
  ]
  public pendulums = [
    {path: "pendulums/simple-pendulum", name: 'Simple Pendulum', truncateLength: 0},
    {path: "pendulums/double-pendulum", name: 'Double Pendulum', truncateLength: 0},
    {path: "pendulums/triple-pendulum", name: 'Triple Pendulum', truncateLength: 0},
  ]
  public window: Window & typeof globalThis = window;
  constructor(private nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
  }
}

