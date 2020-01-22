import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeLangPage } from './change-lang';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChangeLangPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeLangPage),
    TranslateModule,
  ],
})
export class ChangeLangPageModule {}
