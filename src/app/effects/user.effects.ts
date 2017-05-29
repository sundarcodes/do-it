import { Observable } from 'rxjs/Observable';
import { AppState } from './../reducers/app.state';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ActionTypes, UserActions } from './../actions/user.actions';
import { AuthService } from './../services/auth.service';

import 'rxjs/add/operator/do';

@Injectable()
export class UserEffects {

  @Effect() login$ = this.actions$
    .ofType(ActionTypes.LOGIN)
    .map((action: Action) => action.payload)
    .switchMap((provider: string) => this.authService.login(provider))
    .do(x => console.log(x))
    .switchMap(res => {
        if (res.user) {
            return Observable.of(this.userAction.loginSuccess({
                uid: res.user.uid,
                name: res.user.providerData[0].displayName,
                email:  res.user.providerData[0].email,
                avatar: res.user.providerData[0].photoURL
                }));
        } else {
            return Observable.of(this.userAction.login(null));
        }
    });

  @Effect() loginSuccess$ = this.actions$
    .ofType(ActionTypes.LOGIN_SUCCESS)
    .map((action: Action) => action.payload)
    .switchMap((user) => this.authService.registerUser(user));


  @Effect() logout$ = this.actions$
    .ofType(ActionTypes.LOGOUT)
    .map(() => this.authService.logout())
    .switchMap(() => Observable.of(this.userAction.logoutSuccess()));

 @Effect() registerUser$ = this.actions$
    .ofType(ActionTypes.REGISTER_USER)
    .map((action: Action) => this.authService.logout())
    .switchMap(() => Observable.of(this.userAction.logoutSuccess()));

    constructor(private actions$: Actions, private authService: AuthService,
    private store: Store<AppState>, private userAction: UserActions) {}
}