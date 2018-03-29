import { Injectable } from '@angular/core';

@Injectable()
export class EnvironmentService {

  constructor() { }

}
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB3Nk9-OWL768L3D2rwSGNTXkxfu3-ECCk',
    authDomain: 'tictactoefirebase-a61d1.firebaseapp.com',
    databaseURL: 'https://tictactoefirebase-a61d1.firebaseio.com',
    projectId: 'tictactoefirebase-a61d1',
    storageBucket: 'tictactoefirebase-a61d1.appspot.com',
    messagingSenderId: '707373248190'
  }
};

