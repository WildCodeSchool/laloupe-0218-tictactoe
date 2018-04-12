import { AuthService } from './../auth.service';
import { Player } from './../models/player';
import { Room } from './../models/room';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import { Router } from '@angular/router';
import { Line } from '../models/line';

@Component({
  selector: 'app-match-making',
  templateUrl: './match-making.component.html',
  styleUrls: ['./match-making.component.css'],
})

export class MatchMakingComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.authState.take(1).subscribe((user) => {
      if (user) {
        this.getRooms();
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  getRooms() {
    const roomsCollection = this.db.collection<Room>('rooms');

    const snapshot = roomsCollection.snapshotChanges().take(1).subscribe((snap) => {
      const player = new Player();
      player.name = this.authService.name;
      player.image = this.authService.image;

      for (const snapshotItem of snap) {
        const roomId = snapshotItem.payload.doc.id;
        const room = snapshotItem.payload.doc.data() as Room;

        if (Object.keys(room.players).length === 1) {
          room.players[this.authService.authId] = player;
          this.db.doc('rooms/' + roomId).update(JSON.parse(JSON.stringify(room)));
          this.router.navigate(['game', roomId]);
          return;
        }
      }

      const newRoom = new Room();
      newRoom.players = {};
      newRoom.grid = this.generateGrid();
      newRoom.players[this.authService.authId] = player;
      newRoom.turn = this.authService.authId;
      newRoom.winner = '0';

      this.db.collection('rooms')
        .add(JSON.parse(JSON.stringify(newRoom)))
        .then((doc) => {
          this.router.navigate(['game', doc.id]);
        });
    });
  }


  returnButton() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  generateGrid(): Line[] {
    const grid: Line[] = [];
    let y = 0;
    while (y < 3) {
      grid[y] = new Line();
      let x = 0;
      while (x < 3) {
        grid[y].cells[x] = 0;
        x += 1;
      }
      y += 1;
    }
    return grid;
  }


}
