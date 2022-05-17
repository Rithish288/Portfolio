import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MATH } from 'math-extended';
import { Subscription } from 'rxjs';
import { CommonVariablesService } from 'src/app/services/common-variables.service';
import { ElementDataService } from 'src/app/services/element-data.service';
import { ElementDetails } from '../element-details';
import { BohrModel } from './bohr-model';

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
  private elementModel2d: BohrModel;

  public element: ElementDetails;
  public Math = Math;
  public window: Window & typeof globalThis = window;
  public NumberConst = Number;
  public String = String;
  public elementImage: string;
  public currentBanner: string = 'General Properties';
  public parent: HTMLDivElement;

  @ViewChild('bohrModel') bohrModel: ElementRef<HTMLCanvasElement>;
  constructor(private host: ElementRef<HTMLElement>, public commonStuff: CommonVariablesService, private elementData: ElementDataService, private domSanitizer: DomSanitizer, private detector: ChangeDetectorRef) {
    this.elementData.currentElement.subscribe(elem => this.element = elem);
    if(sessionStorage.getItem('element-details')) {
      this.element = JSON.parse(sessionStorage.getItem('element-details'));
    }
  }

  ngOnInit(): void {
    this.elementImage = 'assets/element-images/' + this.element.name + '.jpg';
  }

  ngAfterViewInit(): void {
    this.parent = this.commonStuff.parentDiv.nativeElement;
    this.initBohrModel();
    this.parent.onscroll = () => {
      this.setBanner();
      this.stopAnimation();
    };
  }

  private stopAnimation() {
    this.elementModel2d.runAnimation = this.commonStuff.isInViewport(this.bohrModel.nativeElement).visible
    this.detector.detectChanges();
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

  private initBohrModel() {
    this.bohrModel.nativeElement.width = Math.exp(Math.E * 2.1);
    this.bohrModel.nativeElement.height = this.bohrModel.nativeElement.width;
    this.elementModel2d = new BohrModel(this.bohrModel.nativeElement, this.element.shells, true, this.element.symbol);
    this.subscriptions.push(
      this.commonStuff.currentTheme.subscribe(theme =>
        this.elementModel2d.symbolColor = theme
      )
    );
    this.elementModel2d.animate();
  }

  public toPrecision(value: number | string, precision: number): string | void {
    return (typeof value === "string")?
    Number.parseFloat(value).toFixed(precision) : value.toFixed(precision);
  }

  public setElementModelImage() {
    const padWithZeroes = (int: number | string): string => {
      return int.toString().padStart(3, '0');
    }
    let modelURL: string = '';
    switch (this.element.name) {
      case "Aluminium" :
        modelURL = `https://storage.googleapis.com/search-ar-edu/periodic-table/element_${padWithZeroes(this.element.atomicNumber)}_aluminum/element_${padWithZeroes(this.element.atomicNumber)}_aluminum.glb`;
        break;
      case "Caesium":
        modelURL = `https://storage.googleapis.com/search-ar-edu/periodic-table/element_${padWithZeroes(this.element.atomicNumber)}_cesium/element_${padWithZeroes(this.element.atomicNumber)}_cesium.glb`;
        break;
      default:
        modelURL =`https://storage.googleapis.com/search-ar-edu/periodic-table/element_${padWithZeroes(this.element.atomicNumber)}_${this.element.name.toLowerCase()}/element_${padWithZeroes(this.element.atomicNumber)}_${this.element.name.toLowerCase()}.glb`;
    } return modelURL;
  }

  public stringToHTML(string: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(string);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.elementModel2d.animation);
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
