import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/users/authentication.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: boolean;
  constructor(private authService: AuthenticationService, private router: Router, private _snackBar: MatSnackBar,) { }
  username: string;
  ngOnInit(): void {
    this.isLogged = this.authService.isUserLogged();
    let obj = JSON.parse(localStorage.getItem('currentUser')!);
    if(obj){
      this.username = obj['username']
    }
    
    
  }
  logOut(): void {
    this.authService.logout();
    this.router.navigate(['']);
    this._snackBar.open("Logged out successfully", "", {
      duration: 3000
    });
  }

}
