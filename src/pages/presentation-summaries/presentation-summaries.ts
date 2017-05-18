import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Firebase } from '../../providers/firebase'
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-presentation-summaries',
  templateUrl: 'presentation-summaries.html',
  providers: [InAppBrowser]
})
export class PresentationSummaries {

  openUrl(url){
    this.iab.create(url, '_self', {location: 'no', zoom: 'no'})
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: Firebase, public iab: InAppBrowser) {
    
  }

}
