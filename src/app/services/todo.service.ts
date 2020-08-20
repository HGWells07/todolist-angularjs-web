import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, switchMap } from 'rxjs/internal/operators';

import { Todo } from '../models/Todo';
import { Observable, of, BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl: string = 'http://localhost:8080/api/tasks';

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${this.apiUrl}?undoneOnly=0`)
      .pipe(catchError(this.handleError<Todo[]>('getTodos', [])));
  }

  toggleDone(todo: Todo): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/check/${todo.id}`, todo, httpOptions)
      .pipe(catchError(this.handleError<any>('toggleDone', [])));
  }

  deleteTodo(id: String): Observable<String> {
    return this.http.delete<String>(`${this.apiUrl}/${id}`, httpOptions);
  }

  addTodo(todo: Todo) {
    this.http.post<Todo>(this.apiUrl, todo, httpOptions);
  }

  constructor(private http: HttpClient) {}
}
