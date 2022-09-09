import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(5px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(5vw)'
      })),
      transition('hidden => visible', animate('1000ms cubic-bezier(0.62, 0.05, 0.36, 0.99)'))
    ])
  ]
})
export class IndexComponent implements OnInit, OnDestroy {
  @ViewChild('path') path: ElementRef<SVGPathElement>;
  public mainContent = {
    subHead: 'Hello there',
    content: "My name's Rithish and I'm a front-end developer from India."
  }
  public imageState: string = 'hidden';
  public pathState: string = 'empty';
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
    this.responsive();
    setTimeout(() => {
      this.pathState = 'written';
      this.detector.detectChanges();
    }, 0)
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
        this.detector.detectChanges();
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
    this.pathState = 'empty';
    for (let i = this.subs.length - 1; i >= 0; i--) {
      this.subs[i].unsubscribe();
    }
  }

}
