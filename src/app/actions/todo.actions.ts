import { Action } from '@ngrx/store';

export const ActionTypes = {
    LOAD_CURRENT_USER_TODOS: 'LOAD_USER_TODOS',
    LOAD_CURRENT_USER_TODOS_SUCCESS: 'LOAD_CURRENT_USER_TODOS_SUCCESS'
}

export class TodoActions {

    loadCurrentUserTodos() {
        return {
            type: ActionTypes.LOAD_CURRENT_USER_TODOS
        };
    }

    loadCurrentUserTodosSuccess(todos) {
        return {
            type: ActionTypes.LOAD_CURRENT_USER_TODOS_SUCCESS,
            payload: todos
        };
    }

}