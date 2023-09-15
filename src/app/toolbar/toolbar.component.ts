import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { fadeIn } from '../animations';
import { CommonVariablesService } from '../services/common-variables.service';

@Component({
  selector: 'top-navigation-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    fadeIn
  ]
})
export class ToolbarComponent implements OnInit {
  public themeIcon = "dark_mode";
  public isWindowSmall = false;
  public switchTheme: string = 'light theme';
  private theme = localStorage.getItem('theme');
  private isLightTheme = true;
  public navigations = [
    {route: '/landing-page', text: 'Home'},
    {route: '/projects', text: 'Projects'},
    {route: '/canvas-projects', text: 'Canvas'}
    // {route: '/#', text: 'Contact'}
  ]

  @Output() toggleEvent = new EventEmitter<string>();
  constructor(private globalTheme: CommonVariablesService, private observer: BreakpointObserver, private detector: ChangeDetectorRef) {}

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
    this.globalTheme.updateTheme('lightTheme')
  }

  private enableDarkTheme() {
    localStorage.setItem('theme', 'darkTheme');
    this.isLightTheme = false;
    this.theme = "darkTheme";
    this.themeIcon = "light_mode";
    this.switchTheme = 'light theme';
    this.globalTheme.updateTheme('darkTheme')
  }

  public emitEvent() {
    this.toggleEvent.emit(this.theme);
  }

}
