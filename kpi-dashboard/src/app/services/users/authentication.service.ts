import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  public isLogged = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  
  login(username: string, password: string) {
      return this.http.post<any>('/api/authenticate', { username: username, password: password }).pipe(
          map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  this.isLogged.next(true);
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }

              return user;
          }));
  }
  isUserLogged(): boolean{
    if(localStorage.getItem('currentUser')){
      return true;
    }
    else{
      return false;
    }
  }

  logout() {
      // remove user from local storage to log user out
      this.isLogged.next(false);
      localStorage.removeItem('currentUser');
  }
}