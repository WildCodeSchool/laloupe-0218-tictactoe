import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  user: Observable<firebase.User>;

  private authSubscription: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router) {}


  ngOnInit() {
    this.authSubscription = this.authService.authState.subscribe((user) => {
      if (user) {
        this.router.navigate(['/matchmaking']);
      }
    });
  }

  logIn() {
    this.authService.login();
  }

  logOut() {
    this.authService.logout();
  }

}
