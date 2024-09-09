import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { LoginGuard } from './core/guards/login.guard';
import {LoginComponent} from './core/login/login.component';
import { RegistrationComponent } from './core/registration/registration.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent , canActivate: [LoginGuard]},
  { path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard]},

{ path: 'admin', loadChildren: () => import('./adm/adm.module').then((m) => m.AdmModule), canLoad: [AdminGuard], canActivate: [AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
