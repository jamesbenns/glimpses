import { Component } from '@angular/core';
import { App, IonicPage } from 'ionic-angular';
import { Signup } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class Intro {

  constructor(public app: App) {
  }

  next(){
    this.app.getRootNav().push(Signup)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Intro');
  }

}
