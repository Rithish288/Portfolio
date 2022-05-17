import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
import { RemoveHyphenPipe } from './remove-hyphen.pipe';
import { SpaceAfterPipe } from './space-after.pipe';

const pipes = [
  TruncatePipe,
  RemoveHyphenPipe,
  SpaceAfterPipe
]

@NgModule({
  declarations: [...pipes],
  imports: [CommonModule],
  exports: [...pipes]
})
export class PipesModule { }
