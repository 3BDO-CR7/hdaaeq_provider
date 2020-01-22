import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseLangPage } from './choose-lang';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChooseLangPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseLangPage),
    TranslateModule,
  ],
})
export class ChooseLangPageModule {}
