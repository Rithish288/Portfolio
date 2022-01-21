import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

const modules = [
  OverlayModule,
  PortalModule
]

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class CdkModule { }
