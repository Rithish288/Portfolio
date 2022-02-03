import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCanvasResize]'
})
export class CanvasResizeDirective {

  constructor(private el: ElementRef<HTMLCanvasElement>) { }

  @HostListener('window:resize') onResize() {
    this.el.nativeElement.width = window.innerWidth;
    this.el.nativeElement.height = window.innerHeight;
  }

}
