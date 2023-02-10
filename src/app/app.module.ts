import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HammerModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { Material2Module } from './material/material-2.module';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

//Providers
import { SpinnerHttpInterceptorService } from './services/spinner-http-interceptor.service';
import { SpinnerService } from './services/spinner.service';
import { Overlay } from '@angular/cdk/overlay';

//Components
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DirectivesModule } from './directives/directives.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Material2Module,
    MaterialModule,
    DirectivesModule,
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
    },
    SpinnerService,
    Overlay
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
