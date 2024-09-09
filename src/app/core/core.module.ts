import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { StorageService } from './services/localsorage.service';
import { LoginService } from './services/login.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localePt from "@angular/common/locales/pt";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPaginationModule } from 'ngx-pagination';
import { customCurrencyMaskConfig } from '../shared/helpers/currency.helper';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './registration/registration.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ToastrModule.forRoot({
      timeOut: 4500,
      positionClass: 'toast-bottom-left'
    }),
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        LoginService,
        StorageService,
        AdminGuard,
        LoginGuard,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: LOCALE_ID,useValue: "pt-BR"},
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true },
      ],
    };
  }
}
