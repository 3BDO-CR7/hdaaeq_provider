import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankTransferPage } from './bank-transfer';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BankTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(BankTransferPage),
    TranslateModule,
  ],
})
export class BankTransferPageModule {}
