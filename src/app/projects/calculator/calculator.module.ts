import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator.component';
import { MaterialModule } from 'app/material/material.module';


@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    MaterialModule
  ],
})
export class CalculatorModule { }
