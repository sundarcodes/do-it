import { User } from './../models/user';
import { Action } from '@ngrx/store';

export const UserActionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    REGISTER_USER: 'REGISTER_USER'
}

export class UserActions {

    login(data): Action {
        return {
            type: UserActionTypes.LOGIN,
            payload: data
        };
    }

    loginSuccess(resp): Action {
        return {
            type: UserActionTypes.LOGIN_SUCCESS,
            payload: resp
        };
    }

    logout(): Action {
        return {
            type: UserActionTypes.LOGOUT
        };
    }


    logoutSuccess(): Action {
        return {
            type: UserActionTypes.LOGOUT_SUCCESS
        };
    }

    registerUser(user: User): Action {
        return {
            type: UserActionTypes.REGISTER_USER,
            payload: user
        };
    }

}