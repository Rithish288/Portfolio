import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasProjectsComponent } from './canvas-projects.component';

const routes: Routes = [
  {path: '', component: CanvasProjectsComponent, children: [
    {path: 'attractors', loadChildren: () => import('./attractors/attractors.module').then(m => m.AttractorsModule)},
    {path: 'pendulums', loadChildren: () => import('./pendulums/pendulums.module').then(m => m.PendulumsModule)}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanvasProjectsRoutingModule { }
