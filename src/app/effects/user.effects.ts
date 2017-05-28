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
    // .do(x => console.log(x))
    .map(res => {
        console.log(res);
        if (res.user) {
            this.store.dispatch(this.userAction.loginSuccess({
                uid: res.user.uid,
                name: res.user.providerData[0].displayName,
                email:  res.user.providerData[0].email,
                avatar: res.user.providerData[0].photoURL
                }));
        } else {
            this.store.dispatch(this.userAction.login(null));
        }
    });

    @Effect() logout$ = this.actions$
    .ofType(ActionTypes.LOGOUT)
    .map(() => this.authService.logout())
    .map(() => this.store.dispatch(this.userAction.logoutSuccess()));

    constructor(private actions$: Actions, private authService: AuthService,
    private store: Store<AppState>, private userAction: UserActions) {}
}