import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Unlock } from '../pages/unlock/unlock';
import { EventDetails } from '../pages/event-details/event-details';
import { Schedule } from '../pages/schedule/schedule';
import { DatingPage } from '../pages/dating/dating';
import { PresentationSummaries } from '../pages/presentation-summaries/presentation-summaries';
import { Firebase } from '../providers/firebase';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html',
  providers: [Network]
})
export class MyApp {

  @ViewChild('nav') nav: NavController

  pages = [
    {
      name: "Event Details",
      component: EventDetails
    },
    {
      name: "Schedule",
      component: Schedule
    },
    {
      name: "Presentation Summaries",
      component: PresentationSummaries
    }
  ];

  goTo(page){
    this.nav.push(page.component)
  }

  home(){
    this.nav.setRoot(DatingPage)
  }

  monitorConnection(){
    console.log(this.network.type);
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });
  }

  rootPage:any
  constructor(platform: Platform, public network: Network, public firebase: Firebase, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      this.monitorConnection();

      this.firebase.storage.ready().then(
        ()=>{
        this.firebase.storage.get('user').then((val) => {
          console.log('user is', val);
          if(val) this.nav.setRoot(DatingPage);
          else this.nav.setRoot(Unlock);
          splashScreen.hide();
        })
        }
      )
      statusBar.styleDefault();
    });
  }
}

