import { Player } from './../models/player';
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
  player1: String;
  player1Image: String;
  player2Image: String;
  player2: String;
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
        this.player1 = this.room.players[Object.keys(this.room.players)[0]].name;
        this.player2 = this.room.players[Object.keys(this.room.players)[1]].name;
        this.player1Image = this.room.players[Object.keys(this.room.players)[0]].image;
        this.player2Image = this.room.players[Object.keys(this.room.players)[1]].image;
      });
    }

  logOut() {
      this.authService.logout();
      this.router.navigate(['/login']);
  }
}
