import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task/task.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { AuthenticationService } from 'src/app/services/authentication';
import { UsersService } from 'src/app/services/users';
import { Sprint } from 'src/app/models/sprint.model';

interface SprintListFilter {
  label: string;
  value: number;
}
interface WorkedHoursPerSprint {
  label: string;
  value: number;
}

@Component({
  selector: 'app-sprint-management',
  templateUrl: './sprint-management.component.html',
  styleUrls: ['./sprint-management.component.css']
})
export class SprintManagementComponent {

  
  sprintListFilter: SprintListFilter[] = [{label: 'All Sprints', value: 0}];
  selectedSprint = this.sprintListFilter[0].value;
  sprints: Sprint[];
  workedHours: any;
  /** Based on the screen size, switch from standard to one column per row */
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

  constructor(private breakpointObserver: BreakpointObserver,private taskService: TaskService, 
    private sprintService: SprintService, private projectService: ProjectService, 
    private authService: AuthenticationService, private userService: UsersService) {}

  ngOnInit(){
    this.sprintService.getAllSprintsByProjectId(this.authService.getLoggedUser().project_id).subscribe(data => {
      this.sprints = data;
      data.forEach(sprint => {
        this.sprintListFilter.push({label: sprint.sprint_name, value: sprint.sprint_id})
      });
    },error => {
      console.log(error);
    });
    this.sprintService.getWorkedHours(this.authService.getLoggedUser().project_id).subscribe(data => {
      this.workedHours = data;
      let totalHours = 0;
      for( let v in data){
        totalHours += data[v];
      }
      this.workedHours[0] = totalHours;
    })
  }
  

  selectSprint(event: Event) {
    this.selectedSprint = parseInt((event.target as HTMLSelectElement).value);
    console.log(this.selectedSprint)
  }
}
