import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getUserAuthStatus, getUserPic, getUserDisplayName } from './../../reducers/app.state';
import { UserActions } from './../../actions/user.actions';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;
    userName$: Observable<string>;
    userPic$: Observable<string>;

    constructor(private store: Store<AppState>, private userAction: UserActions,
    private router: Router) {
        this.isLoggedIn$ = this.store.select(getUserAuthStatus);
        this.userPic$ = this.store.select(getUserPic);
        this.userName$ = this.store.select(getUserDisplayName);
    }

    logout() {
        console.log('logout');
        this.store.dispatch(this.userAction.logout());
    }

    ngOnInit() {
       this.store.select(getUserAuthStatus)
       .subscribe(isAuthenticated => {
           if (!isAuthenticated) {
                this.router.navigate(['/land']);
           }
       });
    }
}