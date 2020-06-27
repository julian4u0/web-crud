import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from './User'
import { Task } from './Task'

@Injectable({
  providedIn: 'root'
})
export class DataService {


  taskToEdit: any;

  set editTask(task: any) {
    this.taskToEdit = task;
  }

  get editTask(): any {
    return this.taskToEdit;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<User> {
    console.log(user);
    return this.httpClient.post<User>('/api/register', user)
      .pipe(
        catchError(this.handleError('error', user))
      );
  }

  loginUser(user: User): Observable<User> {
    console.log(user);
    return this.httpClient.post<User>('/api/login', user)
      .pipe(
        catchError(this.handleError('error', user))
      );
  }

  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>('/api/createTask', task)
      .pipe(
        catchError(this.handleError('error', task))
      );
  }

  getTasks(task: Task): Observable<Task> {
    return this.httpClient.post<Task>('/api/myTasks', task)
      .pipe(
        catchError(this.handleError('error', task))
      );
  }

  deleteTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>('/api/deleteTask', task)
      .pipe(
        catchError(this.handleError('error', task))
      );
  }
  updateTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>('/api/updateTask', task)
      .pipe(
        catchError(this.handleError('error', task))
      );
  }
}