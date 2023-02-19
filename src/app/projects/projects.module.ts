import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { Material2Module } from '../material/material-2.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { CdkModule } from '../cdk/cdk.module';
import { MainContentComponent } from './main-content/main-content.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    MainContentComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    Material2Module,
    MaterialModule,
    PipesModule,
    CdkModule
  ],
  exports: [
    MainContentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsModule { }
