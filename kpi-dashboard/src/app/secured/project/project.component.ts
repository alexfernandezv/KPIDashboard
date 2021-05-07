import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  users: User[] = [];
  date1 = new FormControl(new Date())
  constructor(private userService: UsersService) { }

  ngOnInit() {
      // get users from secure api end point
      this.userService.getAll().pipe(
          first())
          .subscribe(users => {
              this.users = users;
          });
      
  }

}
