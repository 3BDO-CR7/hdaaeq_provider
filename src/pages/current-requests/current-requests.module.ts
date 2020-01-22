import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentRequestsPage } from './current-requests';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CurrentRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentRequestsPage),
    TranslateModule,
  ],
})
export class CurrentRequestsPageModule {}
