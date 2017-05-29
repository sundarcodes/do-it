import { User } from './../models/user';
import { Action } from '@ngrx/store';

export const ActionTypes = {
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
            type: ActionTypes.LOGIN,
            payload: data
        };
    }

    loginSuccess(resp): Action {
        return {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: resp
        };
    }

    logout(): Action {
        return {
            type: ActionTypes.LOGOUT
        };
    }


    logoutSuccess(): Action {
        return {
            type: ActionTypes.LOGOUT_SUCCESS
        };
    }

    registerUser(user: User): Action {
        return {
            type: ActionTypes.REGISTER_USER,
            payload: user
        };
    }

}