import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon'
import { MatRippleModule } from '@angular/material/core';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';

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
  imports: [CommonModule],
  exports: [...modules]
})
export class MaterialModule { }
