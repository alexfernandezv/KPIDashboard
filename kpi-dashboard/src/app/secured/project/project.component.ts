import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication';
import { Project } from 'src/app/services/project/project.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  user: User;
  project: Project;
  date1 = new FormControl(new Date())
  date2 = new FormControl(new Date())
  projectId: Number;
  constructor(private authService: AuthenticationService, private projectService: ProjectService) { }

  ngOnInit() {
  
    this.user = this.authService.getLoggedUser();
    this.projectId = this.user.project_id;
    this.projectService.getProjectById(this.projectId).subscribe(data => {
      this.project = data;
      this.date1.setValue(this.project.start_date);
      this.date2.setValue(this.project.end_date);
    },error => {
      console.log(error);
    })
      
  }

}
