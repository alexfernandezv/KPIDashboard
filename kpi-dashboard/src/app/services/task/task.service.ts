import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAllTasksBySprintId(id): Observable<any>{
    return this.http.get(`${baseUrl}/sprint/${id}`);
  }
  getTaskById(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}`);
  }
}
