import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  public isLogged = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,  private cookies: CookieService) {}

  login(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/login", user);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
    this.isLogged.next(true);
  }
  getToken() {
    return this.cookies.get("token");
  }
  isUserLogged() {
    return this.isLogged;
  }
  logout() {
    this.cookies.delete("token");
    this.isLogged.next(false);

  }
}