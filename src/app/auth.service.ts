import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  authId: string;
  name: string;
  image: string;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authId = user.uid;
        this.name = user.displayName;
        this.image = user.photoURL;
      } else {
        this.authId = null;
        this.name = null;
        this.image = null;
      }
    });
  }

  get authState() {
    return this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
