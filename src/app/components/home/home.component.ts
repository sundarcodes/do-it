import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Todo } from './../../models/todo';
import { TodoService } from './../../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  projectList$: Observable<Todo[]>;
  personalList$: Observable<Todo[]>;

  projectList: Todo[];
  personalList: Todo[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.todoList$
    .subscribe(list => {
      this.projectList = list.filter(todo => todo.category === 'project' && !todo.isDone);
      this.personalList = list.filter(todo => todo.category === 'personal' && !todo.isDone);
    });
  }

  onProjectTaskAdded(taskName: string) {
     this.todoService.addTaskToProjects(taskName);
  }

  onPersonalTaskAdded(taskName: string) {
    this.todoService.addTaskToPersonal(taskName);
  }

}
