import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Injectable()
export class Firebase {

  database;
  avatars: any;
  users: any = [];
  user: any;
  currentUser = {name: "", dates: []};
  dumped = [];

  getUser(){
    this.storage.get('user').then((val) => {
      if(val){
        firebase.database().ref('users/' + val).on('value', (data) => {
          this.currentUser = data.val();
        });
      }
    })
  };

  setDate(date){
    for(let slot in this.currentUser.dates){
      if(!date.dates[slot].user && !this.currentUser.dates[slot].user) {
        console.log('slot match', slot)
        firebase.database().ref('users/' + date.name.toUpperCase() + '/dates/' + slot ).set({
          user: this.currentUser
        });
        firebase.database().ref('users/' + this.currentUser.name.toUpperCase + '/dates/' + slot ).set({
          user: date
        });
      }
    }
  }

  config = {
    apiKey: "AIzaSyA-bW4fQ_qU9c85kgtDY6-fqLkzR_QDvWU",
    authDomain: "glimpses-62c81.firebaseapp.com",
    databaseURL: "https://glimpses-62c81.firebaseio.com",
    projectId: "glimpses-62c81",
    storageBucket: "glimpses-62c81.appspot.com",
    messagingSenderId: "1021452134490"
  };

  saveUser(){
    return this.storage.set('user', this.user.name.toUpperCase());
  }

  constructor(public storage: Storage) {

    firebase.initializeApp(this.config);
    this.database = firebase.database();
    
    this.storage.ready().then(() => {
      this.getUser();
    });
  
    firebase.database().ref('avatars/').on('value', (data) => {
      console.log(data);
      this.avatars = data.val();
    });

    firebase.database().ref('users/').on('value', (data) => {
      console.log(data.val());
      this.users = data.val();
    });

  }

  signUp() {
    return firebase.database().ref('users/' + this.user.name.toUpperCase() ).set({
      name: this.user.name,
      avatar : this.user.avatar,
      company: this.user.company,
      job: this.user.job,
      datesLeft: 3
    });
  }

}
