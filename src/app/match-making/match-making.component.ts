import { AuthService } from './../auth.service';
import { Player } from './../models/player';
import { Room } from './../models/room';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import { Router } from '@angular/router';

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
      newRoom.players[this.authService.authId] = player;
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
}
