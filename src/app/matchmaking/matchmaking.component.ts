import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Room {
  rooms: string;
}

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})

export class MatchmakingComponent implements OnInit {

  roomCol: AngularFirestoreCollection<Room>;
  rooms: Observable<Room[]>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.getRoom();
  }

  getRoom() {
  }

}
