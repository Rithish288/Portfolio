import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {path: '', component: ProjectsComponent, children: [
    {path: '', redirectTo: 'main-content', pathMatch: 'full'},
    {path: 'main-content', component: MainContentComponent},
    {path: 'periodic-elements', loadChildren: () => import('./periodic-elements/periodic-elements.module').then(m => m.PeriodicElementsModule)},
    {path: 'calculator', loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule)},
    // {path: 'prime-numbers', loadChildren: () => import('./prime-numbers/prime-numbers.module').then(m => m.PrimeNumbersModule)}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
