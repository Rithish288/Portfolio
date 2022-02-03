import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFullScreen]'
})
export class FullScreenDirective {
  @Input('appFullScreen') appcanvas: HTMLCanvasElement;

  constructor(private el: ElementRef<HTMLButtonElement>) {
    this.el.nativeElement.parentElement.style.position = 'relative';
    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.top ='1em';
    this.el.nativeElement.style.right= '1em';
  }

  @HostListener('click') onClick() {
    this.appcanvas.requestFullscreen({navigationUI: 'auto'})
  }

}
