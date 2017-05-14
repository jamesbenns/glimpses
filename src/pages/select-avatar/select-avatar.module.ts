import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectAvatar } from './select-avatar';
import { ArrayPipeModule } from '../../pipes/to-array/to-array.module'

@NgModule({
  declarations: [
    SelectAvatar
  ],
  imports: [
    ArrayPipeModule,
    IonicPageModule.forChild(SelectAvatar),
  ],
  exports: [
    SelectAvatar
  ]
})
export class SelectAvatarModule {}
