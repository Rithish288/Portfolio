import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./index/index.module').then(m => m.IndexModule)},
  {path: '', component: ToolbarComponent},
  {path: '', loadChildren: () => import('./spinner/spinner.module').then(m => m.SpinnerModule)},
  {path: 'landing-page', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)},
  {path: 'canvas-projects', loadChildren: () => import('./canvas-projects/canvas-projects.module').then(m => m.CanvasProjectsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
