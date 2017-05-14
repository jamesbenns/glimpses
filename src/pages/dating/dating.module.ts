import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatingPage } from './dating';
import { ArrayPipeModule } from '../../pipes/to-array/to-array.module'

@NgModule({
  declarations: [
    DatingPage,
  ],
  imports: [
    IonicPageModule.forChild(DatingPage),
    ArrayPipeModule
  ],
  exports: [
    DatingPage
  ]
})
export class DatingPageModule {}
