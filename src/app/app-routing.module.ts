import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utilities/guards/auth.guard';
import { UnauthGuard } from './utilities/guards/unauth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [UnauthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'manage', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
