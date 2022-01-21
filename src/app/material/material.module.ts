import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

const modules = [
  MatProgressSpinnerModule,
  MatButtonModule
]

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class MaterialModule { }
