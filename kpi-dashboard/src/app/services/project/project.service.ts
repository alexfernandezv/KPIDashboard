import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project.model';
const baseUrl = 'http://localhost:8080/api/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectById(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}`);
  }
}
