import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
    TranslateModule,
  ],
})
export class LocationPageModule {}
