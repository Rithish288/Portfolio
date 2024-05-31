import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';

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
