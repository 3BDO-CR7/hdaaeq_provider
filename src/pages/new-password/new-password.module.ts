import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPasswordPage } from './new-password';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPasswordPage),
    TranslateModule,
  ],
})
export class NewPasswordPageModule {}
