import { Node } from '@angular/compiler';
import { ChangeDetectorRef, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTypeAnimation]'
})
export class TypeAnimationDirective {
  @Input() content: string = '';
  @Input() speed: number ;
  @Input() delay: number;
  private displayValue: string;
  private counter: number = 0;
  private timer: any;
  constructor(private el: ElementRef<HTMLElement>) {
    this.displayValue = this.content[0];
    setTimeout(() => this.timer = setInterval(this.typeEffect.bind(this), this.speed? this.speed : 50), this.delay? this.delay : 0);
  }

  private typeEffect() {
    this.displayValue = this.content[this.counter];
    this.el.nativeElement.textContent += this.displayValue;
    this.counter++;
    if(this.counter == this.content.length) clearInterval(this.timer);
  }
}
