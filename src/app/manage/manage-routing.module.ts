import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: '', component: ManageComponent, children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: ':type', component: ListComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
