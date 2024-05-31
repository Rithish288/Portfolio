import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator.component';
import { MaterialModule } from 'app/material/material.module';
import { MaterialFormsModule } from 'app/material/materialForms.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';


@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    MaterialModule,
    MaterialFormsModule,
    MatButtonModule
  ],
})
export class CalculatorModule { }
