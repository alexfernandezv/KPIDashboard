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
  tasks: Array<Task[]> = [];
  date1 = new FormControl(new Date())
  date2 = new FormControl(new Date())
  projectId: Number;

  constructor(private authService: AuthenticationService, private projectService: ProjectService, 
    private sprintService: SprintService, private taskService: TaskService
     ) { }

  ngOnInit() {
  
    this.user = this.authService.getLoggedUser();
    this.projectId = this.user.project_id;
    this.projectService.getProjectById(this.projectId).subscribe(data => {
      this.project = data;
      this.date1.setValue(this.project.start_date);
      this.date2.setValue(this.project.end_date);
    },error => {
      console.log(error);
    });

    this.sprintService.getAllSprintsByProjectId(this.projectId).subscribe(data => {
      this.sprints = data;
      for(let i=0;i<this.sprints.length;i++){
        this.taskService.getAllTasksBySprintId(this.sprints[i].sprint_id).subscribe(data => {
          this.tasks.push(data);
        },error => {
          console.log(error);
        });
      }
      console.log("Tasks",this.tasks)
      console.log("Sprints", this.sprints)
    },error => {
      console.log(error);
    });
      
  }

}
