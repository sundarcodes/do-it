import { Observable } from 'rxjs/Observable';
import { AppState, getUserAuthStatus } from './../../reducers/app.state';
import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class Nav {
    isLoggedIn$: Observable<boolean>;
    constructor(private store: Store<AppState>) {
        this.isLoggedIn$ = this.store.select(getUserAuthStatus);
    }

}