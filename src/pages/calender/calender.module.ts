import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalenderPage } from './calender';
import { TranslateModule } from '@ngx-translate/core';

import { CalendarModule } from 'ionic3-calendar-en';
@NgModule({
  declarations: [
    CalenderPage,
  ],
  imports: [
    IonicPageModule.forChild(CalenderPage),
    TranslateModule,
    CalendarModule
  ],
})
export class CalenderPageModule {}
