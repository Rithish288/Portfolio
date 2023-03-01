import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { PeriodicElementsRoutingModule } from './periodic-elements-routing.module';
import { DirectivesModule } from 'app/directives/directives.module';
import { MaterialModule } from 'app/material/material.module';
import { ElementDataComponent } from './element-data/element-data.component';
import { Material2Module } from 'app/material/material-2.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { ListsComponent } from './lists/lists.component';



@NgModule({
  declarations: [
    PeriodicTableComponent,
    ElementDataComponent,
    ListsComponent
  ],
  imports: [
    CommonModule,
    PeriodicElementsRoutingModule,
    DirectivesModule,
    MaterialModule,
    Material2Module,
    PipesModule
  ],
  exports:[
    PeriodicTableComponent,
    ElementDataComponent,
    ListsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PeriodicElementsModule { }
