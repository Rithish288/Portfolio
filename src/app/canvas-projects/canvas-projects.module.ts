import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modules
import { CanvasProjectsRoutingModule } from './canvas-projects-routing.module';
import { Material2Module } from '../material/material-2.module';
import { MaterialModule } from '../material/material.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';

//Components
import { CanvasProjectsComponent } from './canvas-projects.component';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  declarations: [
    CanvasProjectsComponent
  ],
  imports: [
    CommonModule,
    CanvasProjectsRoutingModule,
    MaterialModule,
    Material2Module,
    CdkAccordionModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [
    CanvasProjectsComponent
  ]
})
export class CanvasProjectsModule { }
