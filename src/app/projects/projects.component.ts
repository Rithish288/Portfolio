import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'web-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  public window: Window & typeof globalThis = window;
  private subscriptions: Subscription[] = [];
  public breadcrumb: string = '';
  public projectHeading: string= '';
  constructor(private nav: NavbarService, private router: Router, private actRoute: ActivatedRoute, public detector: ChangeDetectorRef, private observer: BreakpointObserver) {
    this.nav.show();
  }

  ngOnInit(): void {
    this.breadCrumb();
    this.subscriptions.push(
      this.observer.observe('(max-width: 400px)').subscribe(state => {
        if(state.matches) this.setProjectHeading();
        else this.projectHeading = null;
        this.detector.detectChanges();
      })
    )
  }


  private setProjectHeading() {
    let url: string[] = this.actRoute.snapshot['_routerState'].url.replace('/projects', '').split('/');
    this.projectHeading = url[url.length-1];
    this.subscriptions.push(
      this.router.events.subscribe((event: RouterEvent) => {
        if(event instanceof NavigationEnd) {
          url = this.actRoute.snapshot['_routerState'].url.replace('/projects', '').split('/');
          this.projectHeading = url[url.length-1];
        }
      })
    );
  }

  private breadCrumb() {
    let url = this.actRoute.snapshot['_routerState'].url.replace('/projects', '').replace(/\//g, ' / ');
    this.breadcrumb = url;
    this.subscriptions.push(
      this.router.events.subscribe((event: RouterEvent) => {
        if(event instanceof NavigationEnd) {
          url = this.actRoute.snapshot['_routerState'].url.replace('/projects', '').replace(/\//g, ' / ');
          this.breadcrumb = url;
        }
      })
    );
  }


}
