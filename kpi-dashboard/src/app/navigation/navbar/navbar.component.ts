import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    if(this.usersService.getToken()){
      this.isLogged = true;
    }
    console.log(this.isLogged)
  }
  logOut(): void {
    this.usersService.logout();
  }

}
