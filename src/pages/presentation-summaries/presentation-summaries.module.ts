import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentationSummaries } from './presentation-summaries';

@NgModule({
  declarations: [
    PresentationSummaries,
  ],
  imports: [
    IonicPageModule.forChild(PresentationSummaries),
  ],
  exports: [
    PresentationSummaries
  ]
})
export class PresentationSummariesModule {}
