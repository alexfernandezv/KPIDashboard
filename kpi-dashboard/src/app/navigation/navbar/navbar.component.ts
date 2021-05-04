import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: boolean;
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.isUserLogged().subscribe(data => {
      this.isLogged = data;
    })
  }
  logOut(): void {
    this.usersService.logout();
    this.router.navigate(['']);
  }

}
