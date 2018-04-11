import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Room } from '../models/room';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  roomId: String;
  room: Room;
  user: Observable<firebase.User>;
  authenticated = false;

  constructor(
    public authService: AuthService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {

    this.roomId = this.aRoute.snapshot.paramMap.get('id');
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        console.log(room);

      });
    }

  logOut() {
      this.authService.logout();
      this.router.navigate(['/login']);
  }

}
