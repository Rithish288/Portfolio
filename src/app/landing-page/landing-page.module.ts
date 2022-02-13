import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { DirectivesModule } from '../directives/directives.module';

//Components
import { LandingPageComponent } from './landing-page.component';
import { SpaceComponent } from './space/space.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LandingPageComponent,
    SpaceComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    DirectivesModule,
    MaterialModule
  ],
  exports: [
    LandingPageComponent,
    SpaceComponent
  ]
})
export class LandingPageModule { }
