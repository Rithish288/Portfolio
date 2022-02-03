import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { PendulumsRoutingModule } from './pendulums-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

//Components
import { SimplePendulumComponent } from './simple-pendulum/simple-pendulum.component';
import { DoublePendulumComponent } from './double-pendulum/double-pendulum.component';
import { TriplePendulumComponent } from './triple-pendulum/triple-pendulum.component';


@NgModule({
  declarations: [
    SimplePendulumComponent,
    DoublePendulumComponent,
    TriplePendulumComponent
  ],
  imports: [
    CommonModule,
    PendulumsRoutingModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    SimplePendulumComponent,
    DoublePendulumComponent,
    TriplePendulumComponent
  ]
})
export class PendulumsModule { }
