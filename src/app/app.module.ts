import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { IntroModule } from '../pages/intro/intro.module';
import { UnlockModule } from '../pages/unlock/unlock.module';
import { SignupModule } from '../pages/signup/signup.module';
import { QuestionModule } from '../pages/question/question.module';
import { SelectAvatarModule } from '../pages/select-avatar/select-avatar.module';
import { AvatarModalModule } from '../pages/avatar-modal/avatar-modal.module';
import { EventDetailsModule } from '../pages/event-details/event-details.module';
import { ScheduleModule } from '../pages/schedule/schedule.module';
import { DatingPageModule } from '../pages/dating/dating.module';
import { PresentationSummariesModule } from '../pages/presentation-summaries/presentation-summaries.module';
import { Firebase } from '../providers/firebase';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    AvatarModalModule,
    IntroModule,
    UnlockModule,
    SignupModule,
    QuestionModule,
    DatingPageModule,
    SelectAvatarModule,
    EventDetailsModule,
    ScheduleModule,
    PresentationSummariesModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
