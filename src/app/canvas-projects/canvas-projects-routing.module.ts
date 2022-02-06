import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasProjectsComponent } from './canvas-projects.component';
import { MainContentComponent } from './main-content/main-content.component';

const routes: Routes = [
  {path: '', component: CanvasProjectsComponent, children: [
    {path: '', component: MainContentComponent},
    {path: 'main-content', component: MainContentComponent},
    {path: 'attractors', loadChildren: () => import('./attractors/attractors.module').then(m => m.AttractorsModule)},
    {path: 'pendulums', loadChildren: () => import('./pendulums/pendulums.module').then(m => m.PendulumsModule)}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanvasProjectsRoutingModule { }
