import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttractorsRoutingModule } from './attractors-routing.module';
import { AizawaComponent } from './aizawa/aizawa.component';
import { Attractor } from './attractor';
import { LorenzComponent } from './lorenz/lorenz.component';
import { MaterialModule } from 'app/material/material.module';
import { DirectivesModule } from 'app/directives/directives.module';
import { FourWingComponent } from './four-wing/four-wing.component';
import { ThomasComponent } from './thomas/thomas.component';
import { RabinovichFabrikantComponent } from './rabinovich-fabrikant/rabinovich-fabrikant.component';
import { CliffordComponent } from './clifford/clifford.component';


@NgModule({
  declarations: [
    AizawaComponent,
    CliffordComponent,
    LorenzComponent,
    FourWingComponent,
    ThomasComponent,
    RabinovichFabrikantComponent
  ],
  imports: [
    CommonModule,
    AttractorsRoutingModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    AizawaComponent,
    CliffordComponent,
    LorenzComponent,
    FourWingComponent,
    ThomasComponent,
    RabinovichFabrikantComponent
  ],
  providers: [
    {
      provide: Attractor,
      multi: true,
      useClass: Attractor
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AttractorsModule { }
