import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewOrdersPage } from './new-orders';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(NewOrdersPage),
    TranslateModule,
  ],
})
export class NewOrdersPageModule {}
