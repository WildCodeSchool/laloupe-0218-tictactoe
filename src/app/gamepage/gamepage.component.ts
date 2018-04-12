import { Player } from './../models/player';
import { Line } from '../models/line';
import { Room } from '../models/room';

import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';



@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  roomId: String;
  room: Room;
  message = 'Waiting for opponent';

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
        console.log(room);
        this.room = room;
      });
  }

  isMyTurn(): boolean {
    return this.authService.authId === this.room.turn;
  }

  get me(): Player {
    if (!this.room) {
      return null;
    }
    return this.room.players[this.authService.authId];
  }

  get opponent(): Player {
    if (!this.room) {
      return null;
    }
    return this.room.players[this.opponentId];
  }

  get myId(): string {
    return this.authService.authId;
  }

  get opponentId(): string {
    if (Object.keys(this.room.players)[0] === this.myId) {
      return Object.keys(this.room.players)[1];
    }
    return Object.keys(this.room.players)[0];
  }

  get myPlayerNumber() {
    const ids = Object.keys(this.room.players);
    if (this.authService.authId === ids[0]) {
      return 1;
    }
    return 2;
  }

  changeTurn() {
    this.room.turn = this.room.turn === this.myId ? this.opponentId : this.myId;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cellClicked(y: number, x: number) {
    if (!this.isMyTurn() || this.room.grid[y].cells[x] !== 0) {
      console.log('test');
    } else {

    this.room.grid[y].cells[x] = this.myPlayerNumber;
    this.changeTurn();
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .set(JSON.parse(JSON.stringify(this.room)));
      console.log('test2');
    this.isWin();
    }
  }

  isWin() {
    let player;
    const ids = Object.keys(this.room.players);
    if (this.authService.authId === ids[0]) {
      player = 1;
    } else {
    player = 2;
  }

    if (this.room.grid[0].cells[0] === player && this.room.grid[0].cells[1] === player && this.room.grid[0].cells[2] === player) {
      this.room.winner = this.room.turn;
    }  else if (this.room.grid[1].cells[0] === player && this.room.grid[1].cells[1] === player && this.room.grid[1].cells[2] === player) {
      this.room.winner = this.room.turn;
    }  else if (this.room.grid[2].cells[0] === player && this.room.grid[2].cells[1] === player && this.room.grid[2].cells[2] === player) {
      this.room.winner = this.room.turn;
    } else if (this.room.grid[0].cells[0] === player && this.room.grid[1].cells[0] === player && this.room.grid[2].cells[0] === player) {
      this.room.winner = this.room.turn;
    }  else if (this.room.grid[0].cells[1] === player && this.room.grid[1].cells[1] === player && this.room.grid[2].cells[1] === player) {
      this.room.winner = this.room.turn;
    }  else if (this.room.grid[0].cells[2] === player && this.room.grid[1].cells[2] === player && this.room.grid[2].cells[2] === player) {
      this.room.winner = this.room.turn;
    } else if  (this.room.grid[0].cells[0] === player && this.room.grid[1].cells[1] === player && this.room.grid[2].cells[2] === player) {
      this.room.winner = this.room.turn;
    } else if  (this.room.grid[0].cells[2] === player && this.room.grid[1].cells[1] === player && this.room.grid[2].cells[0] === player) {
      this.room.winner = this.room.turn;
    }

    this.db.doc<Room>('rooms/' + this.roomId).update(this.room);
  }

  playAgain(){
    this.router.navigate(['matchmaking']);
  }
}
