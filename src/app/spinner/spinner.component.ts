import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <mat-spinner role="progressbar" color="primary"></mat-spinner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {}
