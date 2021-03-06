import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Sprint } from 'src/app/models/sprint.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  user: User;
  project: Project;
  sprints: Sprint[];
  members: Array<string> = [];
  tasks: Array<Task[]> = [];
  date1 = new FormControl(new Date())
  date2 = new FormControl(new Date())
  projectId: number;
  workedHours: number = 0;
  weeksRemaining: number = 0;
  roles: Array<string> = [];
  constructor(private authService: AuthenticationService, private projectService: ProjectService) { }

  ngOnInit() {
  
    this.user = this.authService.getLoggedUser();
    this.projectId = this.user.project_id;
    this.projectService.getProjectById(this.projectId).subscribe(data => {
      this.project = data;
      this.date1.setValue(this.project.start_date);
      this.date2.setValue(this.project.end_date);
      this.weeksRemaining = this.weeksBetween(new Date(),new Date(data.end_date));
    },error => {
      console.log(error);
    });

    this.projectService.getAllTasksOfProject(this.projectId).subscribe(data => {
      this.tasks = data.tasks
    },error => {
      console.log(error);
    })
    this.projectService.getProjectWorkedHours(this.projectId).subscribe(data => {
      this.workedHours = data.total_worked_hours
    })
    this.projectService.getUsernamesRole(this.projectId).subscribe(data => {
      for(let member in data){
        this.members.push(member)
        this.roles.push(data[member])
      }
    })
    
    
  }
  weeksBetween(d1, d2) {
    let remaining= Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    if(remaining <0){
      remaining=0
    }
    return remaining;
}

}
