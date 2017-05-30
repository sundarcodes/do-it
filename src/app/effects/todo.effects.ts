import { UserActionTypes } from './../actions/user.actions';
import { TodoService } from './../services/todo.service';
import { TodoActionTypes, TodoActions } from './../actions/todo.actions';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../reducers/app.state';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/do';

@Injectable()
export class TodoEffects {

  @Effect() loadTodosForOnLogin$ = this.actions$
    .ofType(UserActionTypes.LOGIN_SUCCESS)
    .map((action: Action) => action.payload)
    .switchMap((userId) => Observable.of(this.todoAction.loadCurrentUserTodos(userId)));

  @Effect() loadTodosForCurrentUser$ = this.actions$
    .ofType(TodoActionTypes.LOAD_CURRENT_USER_TODOS)
    .map((action: Action) => action.payload)
    .switchMap((user) => this.todoService.fetchTodosForUserId(user.uid))
    .do(x => console.log(x))
    .switchMap(res => Observable.of(this.todoAction.loadCurrentUserTodosSuccess(res))
    );


    constructor(private actions$: Actions, private todoService: TodoService,
    private todoAction: TodoActions){}
}