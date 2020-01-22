import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectLocationPage } from './select-location';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SelectLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectLocationPage),
    TranslateModule,
  ],
})
export class SelectLocationPageModule {}
