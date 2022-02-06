import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { fadeIn } from '../animations';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    fadeIn
  ]
})
export class ToolbarComponent implements OnInit {
  public SVGPath: string = 'M23.5428 6.62545C26.0707 6.82122 28.4876 7.74607 30.5005 9.2879C32.5134 10.8297 34.0358 12.9223 34.8833 15.312C35.7307 17.7018 35.8668 20.286 35.275 22.7515C34.6832 25.217 33.3889 27.4579 31.5491 29.2026C29.7093 30.9473 27.4028 32.1208 24.9094 32.581C22.416 33.0412 19.8426 32.7682 17.5012 31.7952C15.1598 30.8221 13.1509 29.1908 11.7181 27.0989C10.2852 25.0071 9.48987 22.5445 9.4285 20.0097L11.4559 19.9606C11.5078 22.1032 12.18 24.1847 13.3912 25.9529C14.6023 27.7211 16.3004 29.1 18.2795 29.9224C20.2586 30.7449 22.4337 30.9757 24.5414 30.5867C26.649 30.1977 28.5985 29.2058 30.1537 27.7311C31.7088 26.2563 32.8028 24.3622 33.303 22.2782C33.8033 20.1942 33.6882 18.0098 32.9719 15.9899C32.2556 13.9699 30.9687 12.2011 29.2673 10.8978C27.5659 9.59459 25.523 8.81285 23.3862 8.64737L23.5428 6.62545Z';
  public themeIcon = "dark_mode";
  public isWindowSmall = false;
  public switchTheme: string = 'light theme';
  private theme = localStorage.getItem('theme');
  private isLightTheme = true;
  public navigations = [
    {route: '/landing-page', text: 'Home'},
    {route: '/#', text: 'Projects'},
    {route: '/canvas-projects', text: 'Canvas'},
    {route: '/#', text: 'Contact'}
  ]

  @Output() toggleEvent = new EventEmitter<string>();
  constructor(public nav: NavbarService, private observer: BreakpointObserver, private detector: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.theme === 'lightTheme') {
      this.enableLightTheme();
    } else {
      this.enableDarkTheme();
    }
    this.emitEvent();
    this.responsive();
  }

  private responsive() {
    this.observer.observe(['(max-width: 650px)']).subscribe((state: BreakpointState) => {
      if(state.matches) this.isWindowSmall = true;
      else this.isWindowSmall = false;
      this.detector.detectChanges();
    })
  }

  public toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    if(this.isLightTheme) {
      this.enableLightTheme();
    } else {
      this.enableDarkTheme();
    }
  }

  private enableLightTheme() {
    localStorage.setItem('theme', "lightTheme");
    this.isLightTheme = true;
    this.theme = "lightTheme";
    this.themeIcon = "dark_mode";
    this.switchTheme = 'dark theme';
  }

  private enableDarkTheme() {
    localStorage.setItem('theme', 'darkTheme');
    this.isLightTheme = false;
    this.theme = "darkTheme";
    this.themeIcon = "light_mode";
    this.switchTheme = 'light theme';
  }

  public emitEvent() {
    this.toggleEvent.emit(this.theme);
  }

}
