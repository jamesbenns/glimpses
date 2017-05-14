import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Question } from '../question/question';
import { Firebase } from '../../providers/firebase'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  user = {
    name: "",
    company: "",
    job: ""
  }

  constructor(public firebase: Firebase, public app: App, public navCtrl: NavController, public navParams: NavParams, public loadCtrl: LoadingController) {
  }

  signUp(){
    this.firebase.user = this.user;
    this.app.getRootNav().push(Question)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

}
