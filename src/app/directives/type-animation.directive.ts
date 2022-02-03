import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTypeAnimation]'
})
export class TypeAnimationDirective {
  @Input('appTypeAnimation') content: string = '';
  @Input('speed') speed: number;
  /**
   * @param delay - The time delay for the type animation
   */
  @Input('delay') delay: number;
  private displayValue: string;
  private counter: number = 0;
  private timer: any;
  constructor(private el: ElementRef<HTMLElement>) {
    this.displayValue = this.content[0];
    setTimeout(() => this.timer = setInterval(this.typeEffect.bind(this), this.speed ?? 50), this.delay ?? 0);
  }

  private typeEffect() {
    this.displayValue = this.content[this.counter];
    this.el.nativeElement.textContent += this.displayValue;
    this.counter++;
    if(this.counter == this.content.length) clearInterval(this.timer);
  }
}
