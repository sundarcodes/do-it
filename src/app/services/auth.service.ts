import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/empty';

@Injectable()
export class AuthService implements OnDestroy{

  user: Observable<firebase.User>;
  subscription: any;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    this.user = this.afAuth.authState;
   }

   login(provider: string) {
     return Observable.fromPromise(
       this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
   }

  logout() {
    console.log('logout called');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.afAuth.auth.signOut();
  }

  registerUser(user) {
    this.subscription = this.afDb.object(`/users/${user.uid}`)
    .subscribe(res => {
      if (res.$value === null) {
        this.afDb.object(`/users/${user.uid}`).set({
          name: user.name,
          email: user.email,
          avatar: user.avatar
        });
      }
    });
    return Observable.empty();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
