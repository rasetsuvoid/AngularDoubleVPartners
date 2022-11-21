import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { PersonComponent } from './person/person.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {
        path: '', redirectTo: 'person', pathMatch: 'full'
      },
      {path:'person',component:PersonComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
