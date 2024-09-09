import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { AdmContainerComponent } from './adm-container.component';
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxCurrencyModule } from "ngx-currency";
import { QuillModule } from 'ngx-quill';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { StarRatingModule } from 'angular-rating-star';
import { BarRatingModule } from 'ngx-bar-rating';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { PatientFormComponent } from './patient/patient-form/patient-form.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { MessageFormComponent } from './message/message-form/message-form.component';
import { FamilyFormComponent } from './family/family-form/family-form.component';
import { FamilyListComponent } from './family/family-list/family-list.component';
import { PathologyFormComponent } from './pathology/pathology-form/pathology-form.component';
import { PathologyListComponent } from './pathology/pathology-list/pathology-list.component';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';

const editorConfig= {
  modules: {
      toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['code-block'],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }],
      ]
  },
    theme: 'snow',
    formats: [
        'background',
        'bold',
        'color',
        'font',
        'code',
        'italic',
        'link',
        'size',
        'strike',
        'script',
        'underline',
        'blockquote',
        'header',
        'indent',
        'list',
        'align',
        'direction',
        'code-block',
        'formula'
    ]
};

@NgModule({
  declarations: [
    AdmContainerComponent,
    PatientListComponent,
    PatientFormComponent,
    UserFormComponent,
    UserListComponent,
    MessageListComponent,
    MessageFormComponent,
    FamilyFormComponent,
    FamilyListComponent,
    PathologyFormComponent,
    DashboardComponent,
    PathologyListComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    FormsModule,
    StarRatingModule,
    BarRatingModule,
    SharedModule,
    NgxPaginationModule,
    NgChartsModule,
    NgxCurrencyModule,
    MatCheckboxModule,
    QuillModule.forRoot(editorConfig),
    FilterPipeModule
  ]
})
export class AdmModule {
}
