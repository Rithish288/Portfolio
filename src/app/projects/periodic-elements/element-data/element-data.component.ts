import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CommonVariablesService } from 'app/services/common-variables.service';
import { ElementDataService } from 'app/services/element-data.service';
import { ShaderService } from 'app/services/shader.service';
import { ElementDetails } from '../element-details';
import { BohrModel2d } from './bohr-model-2d';
import { BohrModel3d } from './bohr-model-3d';
import { Router } from '@angular/router';

@Component({
  selector: 'element-data',
  templateUrl: './element-data.component.html',
  styleUrls: ['./element-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandIn', [
      transition('void => *', [
        style({transform: 'scale(0)', transformOrigin: 'center'}),
        animate('500ms ease', style({transform: 'scale(1)'})),
      ])
    ])
  ]
})
export class ElementDataComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private elementModel2d: BohrModel2d;
  private elementModel3d: BohrModel3d;

  public element: ElementDetails;
  public Math = Math;
  public window: Window & typeof globalThis = window;
  public NumberConst = Number;
  public String = String;
  public elementImage: string;
  public parent: HTMLDivElement;
  public isSpin: {s2d: boolean, s3d: boolean} = {s2d: true, s3d: true};

  @ViewChild('bohrModel2d') bohrModel2d: ElementRef<HTMLCanvasElement>;
  @ViewChild('bohrModel3d') bohrModel3d: ElementRef<HTMLCanvasElement>;
  constructor(private host: ElementRef<HTMLElement>, public commonStuff: CommonVariablesService, private elementData: ElementDataService, private domSanitizer: DomSanitizer, private detector: ChangeDetectorRef, private shader: ShaderService, private router: Router) {
    this.elementData.currentElement.subscribe(elem => this.element = elem);
    if(sessionStorage.getItem('element-details')) {
      this.element = JSON.parse(sessionStorage.getItem('element-details'));
      if(!isNaN(parseInt(this.element.boilingPoint))) this.element.boilingPoint += "°C";
      if(!isNaN(parseInt(this.element.meltingPoint))) this.element.meltingPoint += "°C";
    }
  }

  ngOnInit(): void {
    this.elementImage = 'assets/element-images/' + this.element.name + '.jpg';
  }

  ngAfterViewInit(): void {
    this.parent = this.commonStuff.parentDiv.nativeElement;
    this.initBohrModel2d();
    this.initBohrModel3d();
    this.parent.onscroll = () => {
      this.setBanner();
      this.stopAnimation();
    };
  }

  private stopAnimation() {
    this.elementModel2d.runAnimation = this.commonStuff.isInViewport(this.bohrModel2d.nativeElement).visible && (this.isSpin.s2d === true);
    this.detector.detectChanges();
  }

  public spinCheck($event, dim : "2d" | "3d") {
    this.isSpin.s2d = $event.target.checked;
    this.isSpin.s3d = $event.target.checked;
    if(dim == "2d")
      this.elementModel2d.runAnimation = this.isSpin.s2d;
    else this.elementModel3d.runAnimation = this.isSpin.s3d;
  }

  private setBanner() {
    for (let i = 1; i < this.host.nativeElement.children.length; i += 2) {
      if(this.commonStuff.isInViewport(this.host.nativeElement.children[i] as HTMLElement).visible == true) {
        this.commonStuff.isInViewport(this.host.nativeElement.children[i] as HTMLElement).html.classList.add('section-banner')
        this.detector.detectChanges();
      } else {
        this.commonStuff.isInViewport(this.host.nativeElement.children[i] as HTMLElement).html.classList.remove('section-banner')
        this.detector.detectChanges();
      }
    }
  }

  private initBohrModel2d() {
    this.bohrModel2d.nativeElement.width = Math.exp(Math.E * 2.1);
    this.bohrModel2d.nativeElement.height = this.bohrModel2d.nativeElement.width;
    this.elementModel2d = new BohrModel2d(this.bohrModel2d.nativeElement, this.element.shells, this.element.symbol);
    this.subscriptions.push(
      this.commonStuff.currentTheme.subscribe(theme =>
        this.elementModel2d.symbolColor = theme
      )
    );
    this.elementModel2d.animate();
  }

  private initBohrModel3d(): void {
    this.elementModel3d = new BohrModel3d(this.bohrModel3d.nativeElement, this.element.shells, this.shader);
    this.elementModel3d.setCanvas();
    this.elementModel3d.start();
  }

  public goBack(): void {
    this.router.navigateByUrl('/projects/periodic-elements/periodic-table');
  }

  public onSliderChange($event) {
    //control zoom of 3d model
    this.elementModel3d.zScale = $event.value;
  }
  public toPrecision(value: number | string, precision: number): string | void {
    return (typeof value === "string")?
    Number.parseFloat(value).toFixed(precision) : value.toFixed(precision);
  }

  public stringToHTML(string: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(string);
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
