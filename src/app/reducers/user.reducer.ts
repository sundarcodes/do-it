import { Action } from '@ngrx/store';
import { User } from './../models/user';
import { UserActionTypes } from './../actions/user.actions';

export interface UserState {
    isAuthenticated: boolean;
    userDetail: User;
}

const initialState: UserState = {
    isAuthenticated: false,
    userDetail: null
}

export const userReducer = (state: UserState = initialState, action: Action) => {
    switch(action.type) {
        case UserActionTypes.LOGIN_SUCCESS:{
            const newState = Object.assign({}, state);
            newState.isAuthenticated = true;
            newState.userDetail = action.payload;
            return newState;
        }
        case UserActionTypes.LOGOUT_SUCCESS: {
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
export const getUserDetails = (state: UserState) => state.userDetail;
