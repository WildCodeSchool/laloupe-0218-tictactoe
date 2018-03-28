import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  user:Observable<firebase.User>;
  authenticated: boolean = false;

  constructor(public af:AngularFireAuth) {
    this.af.authState.subscribe(
      (auth) =>{
        if(auth != null){
          this.user = af.authState;
          this.authenticated = true;
        }
      }
    )
   }

  ngOnInit() {

  }

  signInWithGoogle(){
    this.af.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
    this.authenticated = true;
  }

  signOutWithGoogle(){
    this.af.auth.signOut();
    this.authenticated = false;
  }

}
