import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';

const pipes = [
  TruncatePipe
]

@NgModule({
  declarations: [...pipes],
  imports: [CommonModule],
  exports: [...pipes]
})
export class PipesModule { }
