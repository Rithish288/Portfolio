import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { CommonVariablesService } from './services/common-variables.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Overlay, SpinnerService]

})
export class AppComponent implements AfterViewInit {
  public title = 'Portfolio';
  public defaultTheme: string = 'lightTheme' || 'darkTheme';

  @ViewChild('div') div: ElementRef<HTMLDivElement>;
  constructor(private common: CommonVariablesService, private router: Router, private spinnerOverlay: SpinnerService, private detector: ChangeDetectorRef) {
    this.router.events.subscribe((e: RouterEvent) => {
      switch (true) {
        case e instanceof NavigationStart: {
          this.spinnerOverlay.show();
          break;
        }
        case e instanceof NavigationEnd || e instanceof NavigationError: {
          this.spinnerOverlay.hide();
          break;
        } default: break;
      }
    })
  }

  ngAfterViewInit(): void {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage('hello');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
    this.detector.detectChanges();
    this.positionScroll();
    this.setParentDiv()
  }

  public positionScroll(): void {
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

  private setParentDiv() {
    this.common.parentDiv = this.div;
  }

  receiveEvent($event: string) {
    this.defaultTheme = $event;
  }
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
