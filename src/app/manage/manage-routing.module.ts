import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: '', component: ManageComponent, children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: ':type', component: ListComponent },
    { path: 'add/:type', component: AddComponent },
    { path: 'edit/:type/:id', component: EditComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
