import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { User } from '../../models/user';
import { AuthenticationService } from "../authentication/authentication.service";


const baseUrl = 'http://localhost:8080/api/users';
@Injectable({
  providedIn: "root"
})
export class UsersService {
  
  constructor(private http: HttpClient, private authService: AuthenticationService, private cookies: CookieService) {}

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  getUserById(id){
    return this.http.get(`${baseUrl}/${id}`);
  }

  getUserRoleById(id){
    return this.http.get(`${baseUrl}Role/${id}`);
  }

  getTasksPerRoles(id){
    return this.http.get(`${baseUrl}/${id}/tasks_per_role`);
  }

  getHoursPerRoles(id){
    return this.http.get(`${baseUrl}/${id}/hours_per_role`);
  }
  getBugsPerRoles(id){
    return this.http.get(`${baseUrl}/${id}/bugs_per_role`);
  }

}
