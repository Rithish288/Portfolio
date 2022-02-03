import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoublePendulumComponent } from './double-pendulum/double-pendulum.component';
import { SimplePendulumComponent } from './simple-pendulum/simple-pendulum.component';
import { TriplePendulumComponent } from './triple-pendulum/triple-pendulum.component';

const routes: Routes = [
  {path: 'simple-pendulum', component: SimplePendulumComponent},
  {path: 'double-pendulum', component: DoublePendulumComponent},
  {path: 'triple-pendulum', component: TriplePendulumComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendulumsRoutingModule { }
