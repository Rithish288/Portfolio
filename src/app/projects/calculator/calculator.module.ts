import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator.component';
import { MaterialModule } from 'app/material/material.module';
import { NumberKeyComponent } from './number-key/number-key.component';
import { OperationKeyComponent } from './operation-key/operation-key.component';


@NgModule({
  declarations: [CalculatorComponent, NumberKeyComponent, OperationKeyComponent],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    MaterialModule
  ],
  exports: [CalculatorComponent, NumberKeyComponent]
})
export class CalculatorModule { }
