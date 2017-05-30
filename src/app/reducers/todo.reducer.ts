import { TodoActionTypes } from './../actions/todo.actions';
import { Action } from '@ngrx/store';
import { Todo } from './../models/todo';


export interface TodoState {
    currentUserTodoList: Todo[];
}

const initialState: TodoState = {
    currentUserTodoList: []
}

export const todoReducer = (state: TodoState = initialState, action: Action) => {
    switch(action.type) {
        case TodoActionTypes.LOAD_CURRENT_USER_TODOS_SUCCESS: {
            const newState = Object.assign({}, state);
            newState.currentUserTodoList = action.payload;
            return newState;
        }
        default:
            return state;
    }
}

export const getTodoList = (state: TodoState) => state.currentUserTodoList;
