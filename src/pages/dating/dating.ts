import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, ToastController } from 'ionic-angular';
import { Firebase } from '../../providers/firebase';

@IonicPage()
@Component({
  selector: 'page-dating',
  templateUrl: 'dating.html',
})
export class DatingPage {

  constructor(public firebase: Firebase, public menuCtrl: MenuController, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(true)
  }

  section = "swipe";

  modalOpen = false;

  drag(event, date){
    if(event.getOpenAmount() < -100 && !this.modalOpen) {this.modalOpen = true; this.confirmDate(date)}
    if(event.getOpenAmount() > 100 && !this.modalOpen) {this.modalOpen = true; this.dump(date)}
  }

  dumped = [];
  dated = [];

  inList(date){
    if(this.dumped.indexOf(date) == -1 && this.dated.indexOf(date) == -1) return true;
  }

  shouldDisplay(date){
    //Don't display themselves
    if(date.name == this.firebase.currentUser.name) return false;
    //Don't display if dumped already
    if(this.firebase.dumped.indexOf(date.name) !== -1) return false;
    //Check if a date slot matches
    for(let slot in this.firebase.currentUser.dates){
      if(!date.dates[slot].user && !this.firebase.currentUser.dates[slot].user) {
        console.log('slot match', slot)
        return true
      }
    }
  }

  dump(date){
    let toast = this.toastCtrl.create({
      message: 'You dumped ' + date.name +'!',
      duration: 2000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Undo'
    });
    toast.onDidDismiss((data, role) => {
      this.modalOpen = false;
      if (role !== "close") {
        this.firebase.dumped.push(date.name)
      }
    });
    toast.present();
  }

  confirmDate(date){
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to date '+ date.name +'?',
      message: 'You have '+ (3 - this.dated.length) +' dates left.',
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
            this.firebase.setDate(date);
            let toast = this.toastCtrl.create({
              message: 'You got a date with ' + date.name + '!',
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
