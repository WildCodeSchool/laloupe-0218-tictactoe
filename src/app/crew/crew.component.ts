import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent {

  user: Observable<firebase.User>;
  authenticated = false;

  constructor(public af: AngularFireAuth, private router: Router) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      }
    );
  }
  logOut() {
    this.af.auth.signOut();
    this.authenticated = false;
    this.router.navigate(['/login']);
  }
}
