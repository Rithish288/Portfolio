import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fadeIn } from '../animations';
import { NavbarService } from '../services/navbar.service';
import { skills} from './libraries';

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
  public skills = skills;
  public libraryImageWidth: string = '';
  constructor(private nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
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
}
