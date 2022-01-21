import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { DirectivesModule } from '../directives/directives.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    DirectivesModule,
    MatButtonModule
  ]
})
export class IndexModule { }
