import { User } from './../../models/user';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getUserAuthStatus, getUserDetail} from './../../reducers/app.state';
import { UserActions } from './../../actions/user.actions';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
    isLoggedIn$: Observable<boolean>;
    userDetail$: Observable<User>;
    subscription: any;

    constructor(private store: Store<AppState>, private userAction: UserActions,
    private router: Router) {
        this.isLoggedIn$ = this.store.select(getUserAuthStatus);
        this.userDetail$ = this.store.select(getUserDetail);
    }

    logout() {
        this.store.dispatch(this.userAction.logout());
    }

    ngOnInit() {
       this.subscription = this.store.select(getUserAuthStatus)
       .subscribe(isAuthenticated => {
        //    console.log(isAuthenticated);
           if (!isAuthenticated) {
                this.router.navigate(['/land']);
           }
       });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}