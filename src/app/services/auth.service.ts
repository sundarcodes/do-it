import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
   }

   login(provider: string) {
     return Observable.fromPromise(
       this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
   }

  logout() {
    console.log('logout called');
    this.afAuth.auth.signOut();
  }

}
