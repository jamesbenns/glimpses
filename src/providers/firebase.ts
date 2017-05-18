import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class Firebase {

  database;
  avatars: any;
  users: any;
  user: any;
  currentUser: any;
  dumped = [];
  loading = this.loading = this.loadingCtrl.create({
    content: 'Waiting for a connection...'
  });
  presentations;

  getUsers(){
    this.storage.ready().then(() => {
      this.storage.get('user').then((val) => {
        console.log('User is', val)
        firebase.database().ref('users/').on('value', (data) => {
          this.users = data.val();
          if(val) this.currentUser = this.users[val];
          if(this.loading && this.avatars){
            this.loading.dismiss();
            this.loading = undefined;
          };
        });
      })
    });
  };

  setDate(date){
    //loop through the user's date slots
    for(let slot in this.currentUser.dates){
      //if both users have the same slot free, we found a match
      if(!date.dates[slot] && !this.currentUser.dates[slot]) {
        // Create the data we want to update, without 'dates' property
        delete date.dates;
        let user = this.currentUser;
        delete user.dates;
        var dateData = {};
        dateData[this.currentUser.name.toUpperCase() + "/dates/" + slot] = date;
        dateData[date.name.toUpperCase() + "/dates/" + slot] = user;
        // Do a deep-path update
        return this.database.ref('users/').update(dateData);
      }
    }
  }

  saveUser(){
    return this.storage.set('user', this.user.name.toUpperCase());
  }

  createLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Waiting for a connection...'
    });
    console.log(this.loading)
  }
  
  createUser(){
    return new Promise((resolve, reject) => {
      let ref = this.database.ref('users/' + this.user.name.toUpperCase() )
      ref.set({
          name: this.user.name,
          avatar : this.user.avatar,
          company: this.user.company,
          dates: {
            date1:"",
            date2:"",
            date3:""
          },
          job: this.user.job
        }).then()
    });
  }

  signUp() {

    let ref =  this.database.ref('users/' + this.user.name.toUpperCase() )

    return ref.set({
      name: this.user.name,
      avatar : this.user.avatar,
      company: this.user.company,
      dates: {
        date1:"",
        date2:"",
        date3:""
      },
      job: this.user.job
    });
  }

  constructor(public storage: Storage, public loadingCtrl: LoadingController) {

    let config = {
      apiKey: "AIzaSyA-bW4fQ_qU9c85kgtDY6-fqLkzR_QDvWU",
      authDomain: "glimpses-62c81.firebaseapp.com",
      databaseURL: "https://glimpses-62c81.firebaseio.com",
      projectId: "glimpses-62c81",
      storageBucket: "glimpses-62c81.appspot.com",
      messagingSenderId: "1021452134490"
    };

    firebase.initializeApp(config);
    this.database = firebase.database();
    
    this.database.ref(".info/connected").on("value", snap => {
      if (snap.val() === true) {
        //got connection
        if(this.currentUser && this.avatars){
          this.loading.dismiss();
          this.loading = "";
        }
      } else {
        //no connection
        this.createLoading();
        this.loading.present();
      }
    });
  
    this.database.ref('avatars/').on('value', data => {
      this.avatars = data.val();
      if(this.loading && this.users){
        this.loading.dismiss();
        this.loading = undefined;
      };
    });

    this.database.ref('presentationSummaries/').once('value').then(snapshot => {
      console.log('pres sum', snapshot)
      this.presentations = snapshot.val()
    });

    this.getUsers();

  }

}
