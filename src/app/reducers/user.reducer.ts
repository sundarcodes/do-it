import { Action } from '@ngrx/store';
import { User } from './../models/user';
import { ActionTypes } from './../actions/user.actions';

export type UserState = {
    isAuthenticated: boolean;
    userDetail: User;
}

const initialState: UserState = {
    isAuthenticated: false,
    userDetail: null
}

export const userReducer = (state: UserState = initialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_SUCCESS:{
            const newState = Object.assign({}, state);
            newState.isAuthenticated = true;
            newState.userDetail = action.payload;
            return newState;
        }
        case ActionTypes.LOGOUT_SUCCESS: {
            const newState = Object.assign({}, state);
            newState.isAuthenticated = false;
            newState.userDetail = null;
            return newState;
        }
        default:
            return state;
    }
};

export const getAuthStatus = (state: UserState) => state.isAuthenticated;