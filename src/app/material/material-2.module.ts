import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

const modules = [
  MatToolbarModule,
  MatListModule,
  MatSidenavModule
]

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class Material2Module { }
