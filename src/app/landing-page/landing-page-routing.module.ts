import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { SpaceComponent } from './space/space.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'space', component: SpaceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
