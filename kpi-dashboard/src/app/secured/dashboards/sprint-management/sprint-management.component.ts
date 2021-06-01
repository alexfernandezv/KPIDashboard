import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormArray, FormControl, FormControlDirective } from '@angular/forms';
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
  workedAndRemainingHours: any;
  taskInfo: any;
  dates: any = {};
  completedTasks: any;
  date1: FormControl;
  date2: FormControl;
  reloaded: boolean = false;
  changesPerSprint : any;
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
        this.sprintListFilter.push({label: "Sprint ".concat(sprint.sprint_id), value: sprint.sprint_id})
        this.dates[sprint.sprint_id] = { start_date: new FormControl(new Date(sprint.start_date)), end_date: new FormControl(new Date(sprint.end_date))};
      });
    },error => {
      console.log(error);
    });
    this.sprintService.getWorkedHours(this.authService.getLoggedUser().project_id).subscribe(data => {
      this.workedAndRemainingHours = data;
      let totalHoursWorked = 0;
      let totalHoursRemaining = 0;
      for( let v in data){
          totalHoursWorked += data[v].workedHours;
          totalHoursRemaining += data[v].remainingHours;
      }
      this.workedAndRemainingHours[0] = {workedHours: totalHoursWorked,remainingHours : totalHoursRemaining};
    })
    this.sprintService.getTasks(this.authService.getLoggedUser().project_id).subscribe(data => {
     this.taskInfo = data;
     let totalPlanned = 0;
     let totalCompleted = 0;
      for( let v in data){
          totalPlanned += data[v].totalTasks;
          totalCompleted += data[v].completedTasks;
        
      }
      this.taskInfo[0]= {"totalTasks": totalPlanned, "completedTasks": totalCompleted};
      
    })
    this.sprintService.getChanges(this.authService.getLoggedUser().project_id).subscribe(data => {
      this.changesPerSprint = data;
      let totalChanges = 0;
       for( let v in data){
    
        totalChanges += data[v].addedTasks;
        
       }
       this.changesPerSprint[0]= {addedTasks: totalChanges};
     })
  }
  

  selectSprint(event: Event) {

    this.reloaded = true;
    setTimeout(() => {
      this.reloaded = false;
    },1000)
  }
}