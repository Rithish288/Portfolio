import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonVariablesService {
  private globalTheme = new BehaviorSubject<string>('lightTheme' || 'darkTheme');
  public currentTheme = this.globalTheme.asObservable();
  public toolbarBreak = new BehaviorSubject<string>('55.927px' || '80.927px');
  @ViewChild('div') public parentDiv: ElementRef<HTMLDivElement>;
  constructor() {}

  public updateTheme(value: 'lightTheme' | 'darkTheme') {
    this.globalTheme.next(value);
  }

  public isWindowLarge(): boolean {
    return window.innerWidth > 650;
  }

  public updateToolbarBreak() {
    if(this.isWindowLarge()) {
      this.toolbarBreak.next("55.927px");
    } else {
      this.toolbarBreak.next('80.927px');
    }
    return this.toolbarBreak.value
  }

  public parseMathExpr(str: string) {
    return Function(`'use strict'; return (${str})`)();
  }

  public isInViewport(elem: HTMLElement, threshold?: {top: number, bottom: number}) {
    const rect = elem.getBoundingClientRect();
    if(threshold == undefined)
    return {
      html: elem,
      visible:
        rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    }
    else return {
      html: elem,
      visible:
        rect.top >= threshold.top && rect.left >= 0 &&
        rect.bottom <= threshold.bottom &&
        rect.right <= window.innerWidth
    }
  }
}
