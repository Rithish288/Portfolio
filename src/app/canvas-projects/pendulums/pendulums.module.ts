import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { PendulumsRoutingModule } from './pendulums-routing.module';
import { DirectivesModule } from 'app/directives/directives.module';
import { MaterialModule } from 'app/material/material.module';

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
    DirectivesModule,
    MaterialModule,
  ],
  exports: [
    SimplePendulumComponent,
    DoublePendulumComponent,
    TriplePendulumComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PendulumsModule { }
