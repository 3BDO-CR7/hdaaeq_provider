import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosedOrdersPage } from './closed-orders';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClosedOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(ClosedOrdersPage),
    TranslateModule,
  ],
})
export class ClosedOrdersPageModule {}
