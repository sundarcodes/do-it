import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

import { Todo } from './../../models/todo';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  searchStringSub: BehaviorSubject<string>;
  archiveList$: Observable<Todo[]>;

  constructor(private todoService: TodoService) { 
    this.searchStringSub = new BehaviorSubject('');
  }

  ngOnInit() {
    this.archiveList$ = this.todoService.todoList$
    .combineLatest(this.searchStringSub, (list, searchString) => {
      // console.log(list, searchString);
      return list.filter(todo => todo.isDone && todo.title.includes(searchString));
    });
  }

  onKeyUp(searchStr: string) {
    console.log(searchStr);
    this.searchStringSub.next(searchStr);
  }

}
