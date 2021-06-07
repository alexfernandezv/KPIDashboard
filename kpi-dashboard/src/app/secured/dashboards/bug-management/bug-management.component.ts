import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { AuthenticationService } from 'src/app/services/authentication';
import { UsersService } from 'src/app/services/users';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-bug-management',
  templateUrl: './bug-management.component.html',
  styleUrls: ['./bug-management.component.css']
})
export class BugManagementComponent {
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
        };
      }
     return {
      columns: 5,
      miniCard: { cols: 1, rows: 1 },
      chart: { cols: 2, rows: 3 },
     }
    })
  );
  bugsReported: number;
  bugsSolved: number;
  bugFixTime: number;
  constructor(private breakpointObserver: BreakpointObserver,  
    private _snackBar: MatSnackBar,
    private sprintService: SprintService, private projectService: ProjectService, 
    private authService: AuthenticationService, private userService: UsersService) {}

  ngOnInit(){
    this._snackBar.open("Loading Dashboard...", "", {
      duration: 3000
    });
    this.projectService.getProjectBugs(this.authService.getLoggedUser().project_id).subscribe(data => {
      this.bugsReported = data.bugsReported;
      this.bugsSolved = data.bugsSolved;
      this.bugFixTime = data.bugFixTime;
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
      // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      let pdf = new jspdf('p', 'cm', 'a4'); 
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('Bug Management Dashboard.pdf');   
      this._snackBar.dismiss();
    }); 
    
  }
}
