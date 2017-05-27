import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { Todo } from './../models/todo';

// declare var _: any;
import * as _ from 'lodash';

@Injectable()
export class TodoService {

  baseURL: string = 'https://doit-5db57.firebaseio.com/todo';

  private todoListSub: BehaviorSubject<Todo[]>;
  public todoList$: Observable<Todo[]>;

  constructor(private http: Http) {
    this.todoListSub = new BehaviorSubject([]);
    this.todoList$ = this.todoListSub.asObservable();
    this.fetchAllTodos();
   }

   fetchAllTodos() {
    const todoList = [];
    return this.http.get(`${this.baseURL}.json`)
    .subscribe(data => {
      const resp = data.json();
      const keysArr = Object.keys(resp);
      for(let i = 0; i < keysArr.length; i++) {
        const key = keysArr[i];
        const todoRspObj = resp[key];
        const todoModel = new Todo(todoRspObj.title, todoRspObj.category, key,
        todoRspObj.isDone, todoRspObj.createdDate, todoRspObj.endDate);
        todoList.push(todoModel);
      }
      // console.log(todoList);
      this.todoListSub.next(todoList);
    });
   }

   addTaskToProjects(taskName: string) {
     this.postTask(new Todo(taskName, 'project'));
   }

   addTaskToPersonal(taskName: string) {
     this.postTask(new Todo(taskName, 'personal'));
   }

   postTask(todo: Todo) {
    this.http.post(`${this.baseURL}.json`, todo)
        .subscribe(data => {
          // console.log(data.json());
          todo.id = data.json().name;
          const todoList: Todo[] = this.todoListSub.getValue();
          todoList.push(todo);
          this.todoListSub.next(todoList);
        }, err => {
          console.log(err);
        });
  }

  deleteTodo(id: string) {
    this.http.delete(`${this.baseURL}/${id}.json`)
    .subscribe(res => {
      console.log(res.json());
      // Delete the Object
      let todoList: Todo[] = this.todoListSub.getValue();
      _.remove(todoList, todo => todo.id === id);
      this.todoListSub.next(todoList);
    })
  } 

  markTodoAsDone(todo: Todo) {
    // todo.isDone = true;
    // todo.endDate = Date.now();
    const updatedTodo: Todo = Object.assign({}, todo);
    updatedTodo.isDone = true;
    updatedTodo.endDate = Date.now();
    this.http.put(`${this.baseURL}/${todo.id}.json`, updatedTodo)
    .subscribe(res => {
      console.log(res.json());
      const respTodo = res.json();
      const todoList: Todo[] = this.todoListSub.getValue();
      todoList.forEach(todo => {
        if (todo.id === respTodo.id) {
          todo.isDone = true;
          todo.endDate = respTodo.endDate;
        }
      });
      this.todoListSub.next( todoList);
    });
  }

  revertTodo(todo: Todo) {
    const updatedTodo: Todo = Object.assign({}, todo);
    updatedTodo.isDone = false;
    updatedTodo.endDate = 0;
    this.http.put(`${this.baseURL}/${todo.id}.json`, updatedTodo)
    .subscribe(res => {
      console.log(res.json());
      const respTodo = res.json();
      const todoList: Todo[] = this.todoListSub.getValue();
      todoList.forEach(todo => {
        if (todo.id === respTodo.id) {
          todo.isDone = false;
          todo.endDate = 0;
        }
      });
      this.todoListSub.next( todoList);
    });
  }

}
