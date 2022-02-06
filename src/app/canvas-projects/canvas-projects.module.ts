import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modules
import { CanvasProjectsRoutingModule } from './canvas-projects-routing.module';
import { Material2Module } from '../material/material-2.module';
import { MaterialModule } from '../material/material.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';

//Components
import { CanvasProjectsComponent } from './canvas-projects.component';
import { MainContentComponent } from './main-content/main-content.component';


@NgModule({
  declarations: [
    CanvasProjectsComponent,
    MainContentComponent
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
    CanvasProjectsComponent,
    MainContentComponent
  ]
})
export class CanvasProjectsModule { }
