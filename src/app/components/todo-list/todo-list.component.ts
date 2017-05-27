import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
 
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() title: string;
  @Input() todoList: Todo[];

  @Output() taskAdded: EventEmitter<string> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  // console.log(this.todoList);
  }

  isOk(item) {
    const diffInTime = this.findTotalMsElapsed(item.createdDate);
    const milliSecondsInADay = 24 * 60 * 60 * 1000;
    // console.log(diffInTime, milliSecondsInADay);
    return (diffInTime < milliSecondsInADay) ? true: false;
  }

  isDueByOneDay(item) {
    const diffInTime = this.findTotalMsElapsed(item.createdDate);
    const milliSecondsInADay = 24 * 60 * 60 * 1000;
    const milliSecondsIn2Days = 2 * 24 * 60 * 60 * 1000;
    return (diffInTime > milliSecondsInADay && diffInTime < milliSecondsIn2Days  ) ? true: false;
  }

  isOverDue(item) {
    const diffInTime = this.findTotalMsElapsed(item.createdDate);
    const milliSecondsIn3Days = 3 * 24 * 60 * 60 * 1000;
    return diffInTime > milliSecondsIn3Days ? true: false;
  }

  findTotalMsElapsed(createdDate: number) {
    const currentDate = Date.now();
    // console.log(createdDate, Date.now());
    const diffInTime = currentDate - createdDate; 
    return diffInTime;
  }
  
  addTask(taskName: string) {
    // console.log(taskName);
    this.taskAdded.emit(taskName);
  }

  onCheckboxChange(todo: Todo, e: any) {
    console.log(e.target.checked);
    console.log(todo);
    this.todoService.markTodoAsDone(todo);
  }

}
