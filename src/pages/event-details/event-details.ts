import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the EventDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetails {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
      this.menuCtrl.swipeEnable(false)
  }

}
