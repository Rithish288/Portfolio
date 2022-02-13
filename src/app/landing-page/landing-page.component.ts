import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fadeIn } from '../animations';
import { NavbarService } from '../services/navbar.service';
import { libraries, languages } from './libraries';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeIn
  ]
})
export class LandingPageComponent implements OnInit {
  public libraries = libraries;
  public languages = languages;
  public libraryImageWidth: string = '';
  constructor(private nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
    console.log(this.validAnagram('niswisonc', 'wisconsin'));
  }


  public calcHTMLCSSexp(): number {
    const now = new Date().getFullYear();
    const started_htmlcss: number = 2016;
    return now - started_htmlcss;
  }

  public calcJSexp(): number {
    const now = new Date().getFullYear();
    const started_js: number = 2019;
    return now - started_js;
  }

  public scrollToMainContent() {
    document.querySelector('div.wrapper').scroll({
      behavior: 'smooth',
      top: window.innerHeight
    })
  }

  public calculateLibraryImgWidth(): number {
    const width = (10/100)*window.innerHeight;
    return width;
  }

  public setDimensions(el: any) {
    console.log(el)
  }

  private validAnagram(str1: string, str2: string): boolean {
    if(str1.length !== str2.length) return false;
    return str1.trim().split('').sort().join('') === str2.trim().split('').sort().join('');
  }
}
