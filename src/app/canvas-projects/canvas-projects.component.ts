import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeIn } from '../animations';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-canvas-projects',
  templateUrl: './canvas-projects.component.html',
  styleUrls: ['./canvas-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn]
})
export class CanvasProjectsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public breadcrumb: string = '';
  public projectHeading: string= '';
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
  public dropdowns = [
    [
      {path: "attractors/aizawa", name: 'Aizawa Attractor', truncateLength: 0},
      {path: "attractors/clifford", name: 'Clifford Attractor', truncateLength: 0},
      {path: "attractors/four-wing", name: 'Four Wing Attractor', truncateLength: 0},
      {path: "attractors/lorenz", name: 'Lorenz Attractor', truncateLength: 0},
      {path: "attractors/rabinovich-fabrikant", name: 'Rabinovich Fabrikant Attractor', truncateLength: 13},
      {path: "attractors/thomas", name: 'Thomas Attractor', truncateLength: 0}
    ],
    [
      {path: "pendulums/simple-pendulum", name: 'Simple Pendulum', truncateLength: 0},
      {path: "pendulums/double-pendulum", name: 'Double Pendulum', truncateLength: 0},
      {path: "pendulums/triple-pendulum", name: 'Triple Pendulum', truncateLength: 0},
    ]
  ]
  public window: Window & typeof globalThis = window;
  constructor(private nav: NavbarService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.nav.show();
    this.breadCrumb();
    this.setProjectHeading();
  }

  private setProjectHeading() {
    let url: string[] = this.actRoute.snapshot['_routerState'].url.replace('/canvas-projects', '').split('/');
    this.projectHeading = url[url.length-1];
    this.subscriptions.push(
      this.router.events.subscribe((event: RouterEvent) => {
        if(event instanceof NavigationEnd) {
          url = this.actRoute.snapshot['_routerState'].url.replace('/canvas-projects', '').split('/');
          this.projectHeading = url[url.length-1];
        }
      })
    );
  }

  private breadCrumb() {
    let url = this.actRoute.snapshot['_routerState'].url.replace('/canvas-projects', '').replace(/\//g, ' / ');
    this.breadcrumb = url;
    this.subscriptions.push(
      this.router.events.subscribe((event: RouterEvent) => {
        if(event instanceof NavigationEnd) {
          url = this.actRoute.snapshot['_routerState'].url.replace('/canvas-projects', '').replace(/\//g, ' / ');
          this.breadcrumb = url;
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
