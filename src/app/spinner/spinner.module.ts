import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [SpinnerComponent],
  providers: [OverlayModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpinnerModule { }
