import { Todo } from './../models/todo';
import { Action } from '@ngrx/store';

export const TodoActionTypes = {
    LOAD_CURRENT_USER_TODOS: 'LOAD_USER_TODOS',
    LOAD_CURRENT_USER_TODOS_SUCCESS: 'LOAD_CURRENT_USER_TODOS_SUCCESS',
    ADD_TODO: 'ADD_TODO',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS'
}

export class TodoActions {

    loadCurrentUserTodos(userId) {
        return {
            type: TodoActionTypes.LOAD_CURRENT_USER_TODOS,
            payload: userId
        };
    }

    loadCurrentUserTodosSuccess(todos) {
        return {
            type: TodoActionTypes.LOAD_CURRENT_USER_TODOS_SUCCESS,
            payload: todos
        };
    }

    addTodo(todo: Todo) {
        return {
            type: TodoActionTypes.ADD_TODO,
            payload: todo
        };
    }

    addTodoSuccess(todo: Todo) {
        return {
            type: TodoActionTypes.ADD_TODO_SUCCESS,
            payload: todo
        };
    }

}