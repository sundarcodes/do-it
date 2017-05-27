import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Nav } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';

import { routes } from './app.routes';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    Nav,
    HomeComponent,
    TodoListComponent,
    ArchiveComponent,
    TodoCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ TodoService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
