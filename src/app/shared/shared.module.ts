import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {}

export const modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule
]

export const components = [
  SidebarComponent,
  PaginationComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules,
    NgxMaskModule.forRoot(options),
  ],
  exports: [
    ...modules,
    NgxMaskModule,
    ...components
  ]
})
export class SharedModule { }
