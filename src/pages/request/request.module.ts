import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestPage } from './request';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RequestPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestPage),
    TranslateModule,
  ],
})
export class RequestPageModule {}
