import { Action } from '@ngrx/store';

export const ActionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS'
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

}