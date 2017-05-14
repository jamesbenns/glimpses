import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Unlock } from './unlock';

@NgModule({
  declarations: [
    Unlock,
  ],
  imports: [
    IonicPageModule.forChild(Unlock),
  ],
  exports: [
    Unlock
  ]
})
export class UnlockModule {}
