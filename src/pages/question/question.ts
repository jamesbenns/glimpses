import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectAvatar } from '../select-avatar/select-avatar';
import { Firebase } from '../../providers/firebase'

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class Question {

  constructor(public firebase: Firebase, public app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  answer: String = "";

  next(){
    this.firebase.user.answer = this.answer;
    this.app.getRootNav().push(SelectAvatar);
    console.log(this.firebase.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Question');
  }

}
