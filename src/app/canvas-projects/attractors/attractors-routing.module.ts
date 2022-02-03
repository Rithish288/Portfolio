import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AizawaComponent } from './aizawa/aizawa.component';
import { CliffordComponent } from './clifford/clifford.component';
import { FourWingComponent } from './four-wing/four-wing.component';
import { LorenzComponent } from './lorenz/lorenz.component';
import { RabinovichFabrikantComponent } from './rabinovich-fabrikant/rabinovich-fabrikant.component';
import { ThomasComponent } from './thomas/thomas.component';

const a = 'attractor';

const routes: Routes = [
  {path: 'aizawa', component: AizawaComponent, data: {name: 'aizawa ' + a}},
  {path: 'clifford', component: CliffordComponent, data: {name: 'clifford ' + a}},
  {path: 'lorenz', component: LorenzComponent, data: {name: 'lorenz ' + a}},
  {path: 'four-wing', component: FourWingComponent, data: {name: 'four wing ' + a}},
  {path: 'rabinovich-fabrikant', component: RabinovichFabrikantComponent, data: {name: 'rabinovich fabrikant'}},
  {path: 'thomas', component: ThomasComponent, data: {name: 'thomas ' + a}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttractorsRoutingModule { }
