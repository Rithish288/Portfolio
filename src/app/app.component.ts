import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public title = 'Portfolio';
  public defaultTheme: string;

  @ViewChild('div') div: ElementRef<HTMLDivElement>;
  constructor(private detector: ChangeDetectorRef, private router: Router, private spinnerOverlay: SpinnerService) {
    this.router.events.subscribe((e: RouterEvent) => {
      switch (true) {
        case e instanceof NavigationStart: {
          this.spinnerOverlay.show();
          break;
        }
        case e instanceof NavigationEnd || e instanceof NavigationError: {
          this.spinnerOverlay.hide();
          break;
        }
        default:
          break;
      }
    })
  }
  ngAfterViewInit(): void {
    this.detector.detectChanges();
    this.positionScroll();
  }

  private positionScroll(): void {
    window.onload = () => {
      let scrollY = sessionStorage.getItem('scrollY');
      if(!scrollY) return
      this.div.nativeElement.scroll({
        top: parseFloat(scrollY),
        behavior: 'auto'
      });
      sessionStorage.removeItem('scrollY');
    };
    window.onbeforeunload = () => {
      sessionStorage.setItem('scrollY', this.div.nativeElement.scrollTop.toString());
    }
  }

  receiveEvent($event: string) {
    this.defaultTheme = $event;
  }
}
