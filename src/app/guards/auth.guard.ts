import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthService } from './../services/auth.service';
import { getUserAuthStatus } from './../reducers/app.state';
import { UserState, getAuthStatus } from './../reducers/user.reducer';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private store: Store<UserState>) {}

  canActivate() {
    return true;
  }
}
