import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCanvasResize]'
})
export class CanvasResizeDirective {

  constructor(private el: ElementRef<HTMLCanvasElement>) { }

  @HostListener('window:resize') onResize() {
    this.el.nativeElement.width = window.innerWidth;
    this.el.nativeElement.height = window.innerHeight;
    if(this.el.nativeElement.getContext('webgl2')) {
      const gl = this.el.nativeElement.getContext('webgl2');
      gl.viewport(0, 0, this.el.nativeElement.width, this.el.nativeElement.height)
    }
  }

}
