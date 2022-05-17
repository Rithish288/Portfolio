import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementDataComponent } from './element-data/element-data.component';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';

const routes: Routes = [
  {path: 'periodic-table', component: PeriodicTableComponent},
  {path: 'element-data', component: ElementDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodicElementsRoutingModule { }
