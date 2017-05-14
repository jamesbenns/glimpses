import { Component } from '@angular/core';
import { App, IonicPage } from 'ionic-angular';
import { Intro } from '../intro/intro';

@IonicPage()
@Component({
  selector: 'page-unlock',
  templateUrl: 'unlock.html',
})
export class Unlock {

  code = "";

  constructor(public app: App) {
  }

  checkCode(){
    if (this.code.toUpperCase() == 'HEY') this.app.getRootNav().setRoot(Intro)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Intro');
  }

}
