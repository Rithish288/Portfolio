import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverClass]'
})
export class HoverClassDirective {
  @Input('appHoverClass') class: string;
  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) { }

  @HostListener('mouseover') onMouseOver() {
    this.renderer.addClass(this.el.nativeElement, this.class);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, this.class);
  }

}
