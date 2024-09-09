import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-rating-star';
import { BarRatingModule } from 'ngx-bar-rating';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule.forRoot(),
    NgxSpinnerModule,
    StarRatingModule,
    BarRatingModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
