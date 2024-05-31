import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { trigger, transition, useAnimation } from "@angular/animations";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';
import { transitionFadeIn } from 'app/animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition('hidden => visible', useAnimation(transitionFadeIn('x')))
    ])
  ]
})
export class IndexComponent implements OnInit, OnDestroy {
  @ViewChild('path') path: ElementRef<SVGPathElement>;
  public mainContent = {
    subHead: 'Hello there',
    content: "My name's Rithish and I'm a student who can create websites."
  };
  public imageState: "hidden" | "visible" = 'hidden';
  public margin: string;
  public contentHeight: string;
  public noImage: boolean = true;
  public contentPadding: string;
  public sectionHeight: string;
  public titleDisplay: string;
  private subs: Subscription[] = [];
  constructor(private router: Router, public nav: NavbarService, private observer: BreakpointObserver, private detector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.nav.hide();
    this.detector.detectChanges();
    this.responsive();
  }

  goToHome() {
    this.router.navigateByUrl("/landing-page");
  }

  onLoad() {
    this.imageState = 'visible';
  }

  private responsive() {
    this.subs.push(
      this.observer.observe(['(max-height: 250px)']).subscribe((state: BreakpointState) => {
        if(state.matches) this.titleDisplay = 'none'
        else this.titleDisplay = 'block';
      }),
      this.observer.observe(['(max-height: 375px)']).subscribe((state: BreakpointState) => {
        if(state.matches) {
          this.sectionHeight = '100%';
          this.contentPadding = '1em 2em';
        } else {
          this.sectionHeight = '70%'
          this.contentPadding = '2em';
        };
        this.detector.detectChanges();
      }),
      this.observer.observe(['(max-width: 400px)']).subscribe((state: BreakpointState) => {
        if(state.matches) {
          this.margin = '0 auto';
          this.contentHeight = 'calc(100% - 10em)'
        } else {
          this.margin = '0 0 0 auto';
          this.contentHeight = 'calc(100% - 15vh)'
        };
        this.detector.detectChanges();
      }),
      this.observer.observe(['(max-width: 800px)']).subscribe((state: BreakpointState) => {
        if(state.matches) this.noImage = true
        else this.noImage = false;
        this.detector.detectChanges();
      })
    )
  }

  ngOnDestroy(): void {
    for (let i = this.subs.length - 1; i >= 0; i--) {
      this.subs[i].unsubscribe();
    }
  }

}
