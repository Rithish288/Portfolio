import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeAnimationDirective } from './type-animation.directive';
import { FullScreenDirective } from './full-screen.directive';
import { CanvasResizeDirective } from './canvas-resize.directive';
import { HoverClassDirective } from './hover-class.directive';
import { IntersectionObserverDirective } from './intersection-observer.directive';

const directives = [
  TypeAnimationDirective,
  FullScreenDirective,
  CanvasResizeDirective,
  HoverClassDirective,
  IntersectionObserverDirective
]

@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives]
})
export class DirectivesModule { }
