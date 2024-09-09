import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmContainerComponent } from './adm-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FamilyFormComponent } from './family/family-form/family-form.component';
import { FamilyListComponent } from './family/family-list/family-list.component';
import { MessageFormComponent } from './message/message-form/message-form.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { PathologyFormComponent } from './pathology/pathology-form/pathology-form.component';
import { PathologyListComponent } from './pathology/pathology-list/pathology-list.component';
import { PatientFormComponent } from './patient/patient-form/patient-form.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdmContainerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patient-form', component: PatientFormComponent },
      { path: 'patient-form/:id', component: PatientFormComponent },
      { path: 'patient-list', component: PatientListComponent },
      { path: 'user-form', component: UserFormComponent },
      { path: 'user-form/:id', component: UserFormComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'message-list', component: MessageListComponent },
      { path: 'message-form', component: MessageFormComponent },
      { path: 'message-form/:id', component: MessageFormComponent },
      { path: 'pathology-form', component: PathologyFormComponent },
      { path: 'pathology-form/:id', component: PathologyFormComponent },
      { path: 'pathology-list', component: PathologyListComponent },
      { path: 'family-form', component: FamilyFormComponent },
      { path: 'family-form/:id', component: FamilyFormComponent },
      { path: 'family-list', component: FamilyListComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
