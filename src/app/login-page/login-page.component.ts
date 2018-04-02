import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  user: Observable<firebase.User>;
  authenticated = false;

  constructor(public af: AngularFireAuth, private router: Router) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
          this.router.navigate(['/game']);
        }
      }
    );
   }

  ngOnInit() {

  }

  logIn() {
    this.af.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
    this.authenticated = true;
  }

  logOut() {
    this.af.auth.signOut();
    this.authenticated = false;
  }

}
