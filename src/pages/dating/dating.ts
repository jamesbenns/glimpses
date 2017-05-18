import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, ToastController } from 'ionic-angular';
import { Firebase } from '../../providers/firebase';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-dating',
  templateUrl: 'dating.html',
  providers: [Vibration]
})
export class DatingPage {

  constructor(public vib: Vibration, public firebase: Firebase, public menuCtrl: MenuController, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
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

  datesLeft(){
    let dates = 3;
    for(let slot in this.firebase.currentUser.dates){
      if(this.firebase.currentUser.dates[slot]) dates--
    }
    return dates;
  }

  shouldDisplay(date){
    //Don't display if dumped already
    if(this.firebase.dumped.indexOf(date.name) !== -1) return false;
    //Check if a date slot matches
    let freeSlot;
    for(let slot in this.firebase.currentUser.dates){
      //Return false if already got a date with this user
      if(this.firebase.currentUser.dates[slot].name == date.name) {
        return false
      }
      if(!date.dates[slot] && !this.firebase.currentUser.dates[slot]) {
        freeSlot = slot;
      }
    }
    //Don't display themselves
    if(date.name == this.firebase.currentUser.name) return false;
    //Return true if freeSlot
    if(freeSlot) return true;
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
        this.vib.vibrate(50);
        this.firebase.dumped.push(date.name)
      }
    });
    toast.present();
  }

  confirmDate(date){
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to date '+ date.name +'?',
      message: 'You have '+ this.datesLeft() +' dates left.',
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
            let toast = this.toastCtrl.create({
              message: 'You got a date with ' + date.name + '!',
              duration: 1000,
              position: 'bottom'
            });
            this.firebase.setDate(date).then(()=>{
              toast.present();
              this.vib.vibrate(50);
            })
          }
        }
      ]
    });
    alert.present();
  }

}
