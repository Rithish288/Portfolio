import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AizawaComponent } from './aizawa/aizawa.component';
import { CliffordComponent } from './clifford/clifford.component';
import { FourWingComponent } from './four-wing/four-wing.component';
import { LorenzComponent } from './lorenz/lorenz.component';
import { RabinovichFabrikantComponent } from './rabinovich-fabrikant/rabinovich-fabrikant.component';
import { ThomasComponent } from './thomas/thomas.component';

const routes: Routes = [
  {path: 'aizawa', component: AizawaComponent},
  {path: 'clifford', component: CliffordComponent},
  {path: 'lorenz', component: LorenzComponent},
  {path: 'four-wing', component: FourWingComponent},
  {path: 'rabinovich-fabrikant', component: RabinovichFabrikantComponent},
  {path: 'thomas', component: ThomasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttractorsRoutingModule { }
