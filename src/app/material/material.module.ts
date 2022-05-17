import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';

const modules = [
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatTooltipModule,
  MatDialogModule,
  MatCardModule,
  MatDividerModule,
  MatSliderModule
]

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class MaterialModule { }
