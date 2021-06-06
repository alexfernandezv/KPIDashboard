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
import { UsersService } from 'src/app/services/users';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
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
  notCompletedTasks: number = 0 ;
  taskCompletionRatio: number;
  tasksFilled: Subject<boolean> = new Subject()
  estimatedHours: number = 0;
  neededHours: number = 0;
  roles:  Array<String> = [];
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
    private sprintService: SprintService, private projectService: ProjectService, private authService: AuthenticationService, private userService: UsersService) {}

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
    },error => {
      console.log(error);
    });
    this.projectService.getAllTasksOfProject(this.projectId).subscribe(data => {
      this.tasks = data.tasks;
    })
    this.projectService.getAllTasksEstimatedAndNeededHours(this.projectId).subscribe(data => {
      this.estimatedHours = data.estimated_hours;
      this.neededHours = data.needed_hours
    })
    this.projectService.getTaskCompletion(this.projectId).subscribe(data => {
      this.completedTasks = data.completed_tasks;
      this.notCompletedTasks = data.notCompleted_tasks;
      this.taskCompletionRatio = Math.round( (this.completedTasks / (this.completedTasks + this.notCompletedTasks)) * 100);
    })
    this.projectService.getProjectMembers(this.projectId).subscribe(data => {
      this.members = data.members;
    })
    this.projectService.getProjectRoles(this.projectId).subscribe(data => {
      this.roles = data.roles;
    })
  }
  exportAsPDF(id:string){
    let data = document.getElementById(id);  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); 
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('Team Management Dashboard.pdf');   
    }); 
  }
}
