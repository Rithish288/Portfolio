import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

const modules = [
  MatToolbarModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule
]

@NgModule({
  imports: [CommonModule],
  exports: [...modules]
})
export class Material2Module { }
