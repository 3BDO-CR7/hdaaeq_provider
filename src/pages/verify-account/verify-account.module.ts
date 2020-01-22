import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyAccountPage } from './verify-account';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    VerifyAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyAccountPage),
    TranslateModule,
  ],
})
export class VerifyAccountPageModule {}
