import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from 'src/app/models/task.model';

const baseUrl = 'http://localhost:8080/api/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks$ = new Subject<Task[]>();
  constructor(private http: HttpClient) { }

  getTaskById(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}`);
  }
}
