import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectById(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}`);
  }
  getProjectWorkedHours(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}/worked_hours`);
  }
  getAllTasksOfProject(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}/tasks`);
  }
  getProjectMembers(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}/members`);
  }
  getAllTasksEstimatedAndNeededHours(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}/tasks/hours`);
  }
  getTaskCompletion(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}/tasks/check_completion`);
  }
  getProjectRoles(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}/user_roles`);
  }
}
