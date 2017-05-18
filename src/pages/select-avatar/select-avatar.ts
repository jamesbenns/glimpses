import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { AvatarModal } from '../avatar-modal/avatar-modal';
import { DatingPage } from '../dating/dating';
import { Firebase } from '../../providers/firebase'

@IonicPage()
@Component({
  selector: 'page-select-avatar',
  templateUrl: 'select-avatar.html',
})
export class SelectAvatar {

  constructor(public firebase: Firebase, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public app: App, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    console.log(this.navParams.data);
  }

  selectedAvatar = {name: ""};

  next(){
    let loading = this.loadingCtrl.create({
      content: 'Making you sexy...'
    });
    loading.present();
    this.firebase.user.avatar = this.selectedAvatar.name;
    this.firebase.storage.ready().then(
      ()=>{
        this.firebase.saveUser().then(
          ()=>{
            this.firebase.signUp().then(
              ()=>{
                this.firebase.getUsers();
                this.app.getRootNav().setRoot(DatingPage);
                loading.dismiss();
              },
              () => {
                let alert = this.alertCtrl.create({
                  title: 'Error connecting to database',
                  subTitle: 'Please check your connection and try again.',
                  buttons: ['OK']
                });
                alert.present();
              }
            )
          },
          () => {
            let alert = this.alertCtrl.create({
              title: 'Error storing user',
              subTitle: 'Please restart the app and try again.',
              buttons: ['OK']
            });
            alert.present();
          }
        )
      }
    )
  }

  launchModal(index){
   let avatarModal = this.modalCtrl.create(AvatarModal, {index: index});
   avatarModal.onDidDismiss(data => {
     console.log(data);
     if(data) this.selectedAvatar = data;
     console.log(this.selectedAvatar);
   });
   avatarModal.present();
  }

}
