import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNumbersComponent } from './prime-numbers.component';

const routes: Routes = [
  {path: '', component: PrimeNumbersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimeNumbersRoutingModule { }
