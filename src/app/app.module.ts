import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HammerModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

//Components
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { SpinnerHttpInterceptorService } from './services/spinner-http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: false
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerHttpInterceptorService,
      multi: true,
    }
  ]
})
export class AppModule { }
