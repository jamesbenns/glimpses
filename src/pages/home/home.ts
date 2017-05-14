import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, ToastController } from 'ionic-angular';
import { Firebase } from '../../providers/firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public firebase: Firebase, public menuCtrl: MenuController, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(true)
  }

  section = "swipe";

  modalOpen = false;

  drag(event, date){
    console.log(event);
    if(event.getOpenAmount() < -100 && !this.modalOpen) {this.modalOpen = true; this.confirmDate(date)}
    if(event.getOpenAmount() > 100 && !this.modalOpen) {this.modalOpen = true; this.dump(date)}
  }

  dumped = [];
  dated = [];

  inList(date){
    if(this.dumped.indexOf(date) == -1 && this.dated.indexOf(date) == -1) return true;
  }

  dump(date){
    setTimeout(()=>{this.dumped.push(date)}, 500);
    console.log(this.dumped);
    let toast = this.toastCtrl.create({
      message: 'You dumped ' + date.name +'!',
      duration: 1000,
      position: 'bottom'
    });
    toast.onDidDismiss(()=>{
      this.modalOpen = false;
    })
    toast.present();
  }

  confirmDate(date){
    let alert = this.alertCtrl.create({
      title: 'Send a date request to ' + date.name + '?',
      message: 'Are you sure you want to date '+ date.name +'? You have 3 date credits remaining.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.modalOpen = false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.modalOpen = false;
            this.dated.push(date);
            let toast = this.toastCtrl.create({
              message: 'You sent ' + date.name + ' a date request!',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
    alert.present();
  }

}
