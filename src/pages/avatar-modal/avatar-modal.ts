import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Firebase } from '../../providers/firebase'

@IonicPage()
@Component({
  selector: 'page-avatar-modal',
  templateUrl: 'avatar-modal.html'
})
export class AvatarModal {
  
  @ViewChild(Slides) slides: Slides;

  index;

  constructor(public navCtrl: NavController, public firebase: Firebase, public navParams: NavParams, public viewCtrl: ViewController) {
    this.index = this.navParams.data.index;
    console.log(this.navParams);
  }

  dismiss(avatar) {
    console.log(avatar);
    this.viewCtrl.dismiss(avatar);
  }

}
