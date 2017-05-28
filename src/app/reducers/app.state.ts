import { AppComponent } from './../app.component';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import { UserState, userReducer, getAuthStatus } from './user.reducer';


// Entire state of App
export interface AppState {
    users: UserState;
}


// Exporting all Reducers
export const appReducer = compose(combineReducers)({
    users: userReducer
});


export const userState = (appState: AppState) => {
   return appState.users;
};
export const getUserAuthStatus = createSelector(userState, getAuthStatus);

