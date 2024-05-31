import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { transitionFadeIn } from '../animations';
import { NavbarService } from '../services/navbar.service';
import { skills} from './libraries';
import { transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [transition(':enter', useAnimation(transitionFadeIn('y')))]),
    trigger('fadeInArrow', [transition(':enter', useAnimation(transitionFadeIn('y', '500ms')))])
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
