import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvatarModal } from './avatar-modal';
import { ArrayPipeModule } from '../../pipes/to-array/to-array.module'

@NgModule({
  declarations: [
    AvatarModal
  ],
  imports: [
    ArrayPipeModule,
    IonicPageModule.forChild(AvatarModal),
  ],
  exports: [
    AvatarModal
  ]
})
export class AvatarModalModule {}
