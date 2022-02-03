import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { DirectivesModule } from '../directives/directives.module';
import { MatCardModule } from '@angular/material/card';

//Components
import { LandingPageComponent } from './landing-page.component';
import { SpaceComponent } from './space/space.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    SpaceComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    DirectivesModule,
    MatCardModule,
  ],
  exports: [
    LandingPageComponent,
    SpaceComponent
  ]
})
export class LandingPageModule { }
