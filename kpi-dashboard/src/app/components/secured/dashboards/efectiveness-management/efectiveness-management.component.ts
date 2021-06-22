import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TaskService } from 'src/app/services/task/task.service';
import { UsersService } from 'src/app/services/users';
import { ProjectService } from 'src/app/services/project/project.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { AuthenticationService } from 'src/app/services/authentication';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar,
    private sprintService: SprintService, private projectService: ProjectService, 
    private authService: AuthenticationService, private userService: UsersService) {}

  ngOnInit(){
    this._snackBar.open("Loading Dashboard...", "", {
      duration: 3000
    });
    this.projectService.getProjectEfectiveness(this.authService.getLoggedUser().project_id).subscribe(data => {
      this.leadTime = data.leadTime;
      this.cycleTime = data.cycleTime;
      if(data.accomplishmentRatio >= 100)
        this.accomplishmentRatio = 100;
      else{
        this.accomplishmentRatio = data.accomplishmentRatio;
      }
      this._snackBar.dismiss();
    })
  }

  exportAsPDF(id:string){
    this._snackBar.open("Downloading PDF...", "", {
      duration: 3000
    });
    let data = document.getElementById(id);  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); 
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('Efectiveness Management Dashboard.pdf');   
      this._snackBar.dismiss();
    }); 
    
  }
}
