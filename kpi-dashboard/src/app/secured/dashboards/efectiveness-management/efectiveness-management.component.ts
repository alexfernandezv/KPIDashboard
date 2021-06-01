import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TaskService } from 'src/app/services/task/task.service';
import { UsersService } from 'src/app/services/users';
import { ProjectService } from 'src/app/services/project/project.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { AuthenticationService } from 'src/app/services/authentication';


@Component({
  selector: 'app-efectiveness-management',
  templateUrl: './efectiveness-management.component.html',
  styleUrls: ['./efectiveness-management.component.css']
})
export class EfectivenessManagementComponent {
  
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
      miniCard: { cols: 2, rows: 1 },
      chart: { cols: 2, rows: 3 },
     }
    })
  );
  leadTime: number;
  cycleTime: number;
  accomplishmentRatio: number;
  constructor(private breakpointObserver: BreakpointObserver,private taskService: TaskService, 
    private sprintService: SprintService, private projectService: ProjectService, 
    private authService: AuthenticationService, private userService: UsersService) {}

  ngOnInit(){
    this.projectService.getProjectEfectiveness(this.authService.getLoggedUser().project_id).subscribe(data => {
      this.leadTime = data.leadTime;
      this.cycleTime = data.cycleTime;
      this.accomplishmentRatio = data.accomplishmentRatio;
    })
  }
}
