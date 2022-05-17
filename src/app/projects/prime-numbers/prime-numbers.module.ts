import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNumbersRoutingModule } from './prime-numbers-routing.module';
import { PrimeNumbersComponent } from './prime-numbers.component';


@NgModule({
  declarations: [PrimeNumbersComponent],
  imports: [
    CommonModule,
    PrimeNumbersRoutingModule
  ],
  exports: [PrimeNumbersComponent]
})
export class PrimeNumbersModule { }
