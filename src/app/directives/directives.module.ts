import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeAnimationDirective } from './type-animation.directive';
import { FullScreenDirective } from './full-screen.directive';
import { CanvasResizeDirective } from './canvas-resize.directive';

const directives = [
  TypeAnimationDirective,
  FullScreenDirective,
  CanvasResizeDirective
]

@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives]
})
export class DirectivesModule { }
