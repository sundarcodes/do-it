import { TodoActions } from './actions/todo.actions';
import { TodoEffects } from './effects/todo.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';
import { appReducer } from './reducers/app.state';
import { UserEffects } from './effects/user.effects';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';

import { routes } from './app.routes';
import { TodoService } from './services/todo.service';
import { AuthService } from './services/auth.service';
import { UserActions } from './actions/user.actions';
import { AuthResolve } from './services/auth.resolve';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    TodoListComponent,
    ArchiveComponent,
    TodoCardComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.provideStore(appReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(UserEffects),
    EffectsModule.run(TodoEffects)
  ],
  providers: [ TodoService, AuthService, AuthResolve, UserActions, 
  AngularFireDatabase, TodoActions ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
