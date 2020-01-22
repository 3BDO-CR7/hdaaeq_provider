import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendQuotePage } from './send-quote';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SendQuotePage,
  ],
  imports: [
    IonicPageModule.forChild(SendQuotePage),
    TranslateModule,
  ],
})
export class SendQuotePageModule {}
