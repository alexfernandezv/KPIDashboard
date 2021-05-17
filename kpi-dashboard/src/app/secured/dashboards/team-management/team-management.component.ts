import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TaskService } from 'src/app/services/task/task.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { MiniCard } from 'src/app/models/mini-card.model';
import { Task } from 'src/app/models/task.model';
import { Sprint } from 'src/app/models/sprint.model';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent implements OnInit{
  value: number= 15;
  user: User;
  project: Project;
  sprints: Sprint[];
  members: Array<String> = [];
  tasks: Array<Task[]> = [];
  projectId: number;
  completedTasks: number = 0;
  notCompletedTasks: number = 0;
  taskCompletionRatio: number = 0;
  tasksFilled: Subject<boolean> = new Subject()
  estimatedHours: number = 0;
  neededHours: number = 0;
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

     return {
      columns: 4,
      miniCard: { cols: 1, rows: 1 },
      chart: { cols: 2, rows: 3 },
     }
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private taskService: TaskService, 
    private sprintService: SprintService, private projectService: ProjectService, private authService: AuthenticationService) {}

  ngOnInit(){
    this.user = this.authService.getLoggedUser();
    this.projectId = this.user.project_id;
    this.projectService.getProjectById(this.projectId).subscribe(data => {
      this.project = data;
    },error => {
      console.log(error);
    });
    this.sprintService.getAllSprintsByProjectId(this.projectId).subscribe(data => {
      this.sprints = data;
      this.fillAllTasks(data.length);
      
    },error => {
      console.log(error);
    });
    this.tasksFilled.subscribe(data => {
      this.computeMiniCardValues();
      
    })
  }

  fillAllTasks(totalSprints): any{
    for(let i=0;i<totalSprints;i++){
      this.taskService.getAllTasksBySprintId(this.sprints[i].sprint_id).subscribe(data => {
        this.tasks.push(data);
        if(this.tasks.length == totalSprints){
          this.tasksFilled.next(true)
        }
      },error => {
        console.log(error);
      });
    }
    
  }
  computeMiniCardValues() {
    for(let i=0;i<this.tasks.length;i++){
      for(let j=0;j<this.tasks[i].length;j++){
        this.estimatedHours += this.tasks[i][j].estimated_duration;
        this.neededHours += this.tasks[i][j].worked_hours;
        if(this.tasks[i][j].status == 'Completed'){
          this.completedTasks++;
        }
        else{
          this.notCompletedTasks++;
        }
        if(this.members.indexOf(this.tasks[i][j].User_username) <= -1){
          this.members.push(this.tasks[i][j].User_username)
        }
      }
    }
    this.taskCompletionRatio = (this.completedTasks / (this.completedTasks + this.notCompletedTasks)) * 100;
  }
}
