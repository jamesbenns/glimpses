import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentationSummaries } from './presentation-summaries';
import { ArrayPipeModule } from '../../pipes/to-array/to-array.module'

@NgModule({
  declarations: [
    PresentationSummaries,
  ],
  imports: [
    IonicPageModule.forChild(PresentationSummaries),
    ArrayPipeModule
  ],
  exports: [
    PresentationSummaries
  ]
})
export class PresentationSummariesModule {}
