import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import { AppState } from './../reducers/app.state';
import { UserActions } from './../actions/user.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthResolve implements Resolve<any> {

  constructor(private authService: AuthService, private store: Store<AppState>,
  private userActions: UserActions) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.authService.user
    .map(user => {
        console.log(user);
        if (user) {
            this.store.dispatch(this.userActions.loginSuccess({
                uid: user.uid,
                name: user.providerData[0].displayName,
                email:  user.providerData[0].email,
                avatar: user.providerData[0].photoURL
                }));
            return true;
        }
        return false;
    }).take(1);
  }
}