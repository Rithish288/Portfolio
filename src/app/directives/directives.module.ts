import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeAnimationDirective } from './type-animation.directive';

const directives = [
  TypeAnimationDirective
]

@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives]
})
export class DirectivesModule { }
