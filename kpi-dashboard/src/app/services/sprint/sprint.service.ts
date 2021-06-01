import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/sprints';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }
  
  getAllSprintsByProjectId(id): Observable<any>{
    return this.http.get(`${baseUrl}/project/${id}`);
  }

  getSprintById(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}`);
  }

  getWorkedHours(id): Observable<any>{
    return this.http.get(`${baseUrl}/project/${id}/hours_worked`);
  }

  getTasks(id): Observable<any>{
    return this.http.get(`${baseUrl}/project/${id}/tasks`);
  }

  getChanges(id): Observable<any>{
    return this.http.get(`${baseUrl}/project/${id}/changes`);
  }

  getBurndownPoints(idProject, idSprint): Observable<any>{
    return this.http.get(`${baseUrl}/project/${idProject}/${idSprint}/burndown`);
  }

  getCompletedStoryPoints(idProject, idSprint): Observable<any>{
    return this.http.get(`${baseUrl}/project/${idProject}/${idSprint}/story_points`);
  }
}
