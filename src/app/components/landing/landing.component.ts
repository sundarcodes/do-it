import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';

import { Store } from '@ngrx/store';

import { UserActions } from './../../actions/user.actions';
import { AppState, getUserAuthStatus } from './../../reducers/app.state';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  subscription: any;

  constructor(private store: Store<AppState>, private userAction: UserActions,
   private router: Router) { }

  ngOnInit() {
    this.subscription = this.store.select(getUserAuthStatus)
    .subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      }
    });
  }

  loginWithGoogle() {
    this.store.dispatch(this.userAction.login('google'));
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

}
