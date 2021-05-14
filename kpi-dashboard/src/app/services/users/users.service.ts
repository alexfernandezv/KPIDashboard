import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { User } from '../../models/user';
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  
  constructor(private http: HttpClient, private authService: AuthenticationService, private cookies: CookieService) {}

  getAll() {
    return this.http.get<User[]>('/api/users');
}

}
