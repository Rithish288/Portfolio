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
    ]),
    trigger('writeName', [
      state('empty', style({
        strokeDasharray: 776.5869750976562 / 7,
        strokeDashoffset: 776.5869750976562 / 7,
      })),
      state('written', style({
        strokeDasharray: 0,
        strokeDashoffset: 0,
      })),
      transition('empty => written', animate('4s cubic-bezier(0.15, 0.92, 1, 1)'))
    ])
  ]
})
export class IndexComponent implements OnInit, OnDestroy {
  @ViewChild('path') path: ElementRef<SVGPathElement>;
  public mainContent = {
    svgPath: 'M8.29785 14.3721H3.28809V23H0.460938V1.67188H7.52148C9.92383 1.67188 11.7695 2.21875 13.0586 3.3125C14.3574 4.40625 15.0068 5.99805 15.0068 8.08789C15.0068 9.41602 14.6455 10.5732 13.9229 11.5596C13.21 12.5459 12.2139 13.2832 10.9346 13.7715L15.9443 22.8242V23H12.9268L8.29785 14.3721ZM3.28809 12.0723H7.60938C9.00586 12.0723 10.1143 11.7109 10.9346 10.9883C11.7646 10.2656 12.1797 9.29883 12.1797 8.08789C12.1797 6.76953 11.7842 5.75879 10.9932 5.05566C10.2119 4.35254 9.0791 3.99609 7.59473 3.98633H3.28809V12.0723ZM21.4814 23H18.7715V7.15039H21.4814V23ZM18.5518 2.94629C18.5518 2.50684 18.6836 2.13574 18.9473 1.83301C19.2207 1.53027 19.6211 1.37891 20.1484 1.37891C20.6758 1.37891 21.0762 1.53027 21.3496 1.83301C21.623 2.13574 21.7598 2.50684 21.7598 2.94629C21.7598 3.38574 21.623 3.75195 21.3496 4.04492C21.0762 4.33789 20.6758 4.48438 20.1484 4.48438C19.6211 4.48438 19.2207 4.33789 18.9473 4.04492C18.6836 3.75195 18.5518 3.38574 18.5518 2.94629ZM29.5088 3.3125V7.15039H32.4678V9.24512H29.5088V19.0742C29.5088 19.709 29.6406 20.1875 29.9043 20.5098C30.168 20.8223 30.6172 20.9785 31.252 20.9785C31.5645 20.9785 31.9941 20.9199 32.541 20.8027V23C31.8281 23.1953 31.1348 23.293 30.4609 23.293C29.25 23.293 28.3369 22.9268 27.7217 22.1943C27.1064 21.4619 26.7988 20.4219 26.7988 19.0742V9.24512H23.9131V7.15039H26.7988V3.3125H29.5088ZM38.3564 9.06934C39.5576 7.59473 41.1201 6.85742 43.0439 6.85742C46.3936 6.85742 48.083 8.74707 48.1123 12.5264V23H45.4023V12.5117C45.3926 11.3691 45.1289 10.5244 44.6113 9.97754C44.1035 9.43066 43.3076 9.15723 42.2236 9.15723C41.3447 9.15723 40.5732 9.3916 39.9092 9.86035C39.2451 10.3291 38.7275 10.9443 38.3564 11.7061V23H35.6465V0.5H38.3564V9.06934ZM55.1143 23H52.4043V7.15039H55.1143V23ZM52.1846 2.94629C52.1846 2.50684 52.3164 2.13574 52.5801 1.83301C52.8535 1.53027 53.2539 1.37891 53.7812 1.37891C54.3086 1.37891 54.709 1.53027 54.9824 1.83301C55.2559 2.13574 55.3926 2.50684 55.3926 2.94629C55.3926 3.38574 55.2559 3.75195 54.9824 4.04492C54.709 4.33789 54.3086 4.48438 53.7812 4.48438C53.2539 4.48438 52.8535 4.33789 52.5801 4.04492C52.3164 3.75195 52.1846 3.38574 52.1846 2.94629ZM68.6934 18.7959C68.6934 18.0635 68.415 17.4971 67.8584 17.0967C67.3115 16.6865 66.3496 16.335 64.9727 16.042C63.6055 15.749 62.5166 15.3975 61.7061 14.9873C60.9053 14.5771 60.3096 14.0889 59.9189 13.5225C59.5381 12.9561 59.3477 12.2822 59.3477 11.501C59.3477 10.2021 59.8945 9.10352 60.9883 8.20508C62.0918 7.30664 63.498 6.85742 65.207 6.85742C67.0039 6.85742 68.459 7.32129 69.5723 8.24902C70.6953 9.17676 71.2568 10.3633 71.2568 11.8086H68.5322C68.5322 11.0664 68.2148 10.4268 67.5801 9.88965C66.9551 9.35254 66.1641 9.08398 65.207 9.08398C64.2207 9.08398 63.4492 9.29883 62.8926 9.72852C62.3359 10.1582 62.0576 10.7197 62.0576 11.4131C62.0576 12.0674 62.3164 12.5605 62.834 12.8926C63.3516 13.2246 64.2842 13.542 65.6318 13.8447C66.9893 14.1475 68.0879 14.5088 68.9277 14.9287C69.7676 15.3486 70.3877 15.8564 70.7881 16.4521C71.1982 17.0381 71.4033 17.7559 71.4033 18.6055C71.4033 20.0215 70.8369 21.1592 69.7041 22.0186C68.5713 22.8682 67.1016 23.293 65.2949 23.293C64.0254 23.293 62.9023 23.0684 61.9258 22.6191C60.9492 22.1699 60.1826 21.5449 59.626 20.7441C59.0791 19.9336 58.8057 19.0596 58.8057 18.1221H61.5156C61.5645 19.0303 61.9258 19.7529 62.5996 20.29C63.2832 20.8174 64.1816 21.0811 65.2949 21.0811C66.3203 21.0811 67.1406 20.876 67.7559 20.4658C68.3809 20.0459 68.6934 19.4893 68.6934 18.7959ZM77.6436 9.06934C78.8447 7.59473 80.4072 6.85742 82.3311 6.85742C85.6807 6.85742 87.3701 8.74707 87.3994 12.5264V23H84.6895V12.5117C84.6797 11.3691 84.416 10.5244 83.8984 9.97754C83.3906 9.43066 82.5947 9.15723 81.5107 9.15723C80.6318 9.15723 79.8604 9.3916 79.1963 9.86035C78.5322 10.3291 78.0146 10.9443 77.6436 11.7061V23H74.9336V0.5H77.6436V9.06934ZM104.743 13.083L102.136 15.793V23H99.3232V1.67188H102.136V12.2188L111.613 1.67188H115.012L106.618 11.0908L115.671 23H112.302L104.743 13.083ZM133.396 14.3721H128.386V23H125.559V1.67188H132.619C135.021 1.67188 136.867 2.21875 138.156 3.3125C139.455 4.40625 140.104 5.99805 140.104 8.08789C140.104 9.41602 139.743 10.5732 139.021 11.5596C138.308 12.5459 137.312 13.2832 136.032 13.7715L141.042 22.8242V23H138.024L133.396 14.3721ZM128.386 12.0723H132.707C134.104 12.0723 135.212 11.7109 136.032 10.9883C136.862 10.2656 137.277 9.29883 137.277 8.08789C137.277 6.76953 136.882 5.75879 136.091 5.05566C135.31 4.35254 134.177 3.99609 132.692 3.98633H128.386V12.0723Z',
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
