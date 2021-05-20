import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthenticationService } from 'src/app/services/authentication';
import { ProjectService } from 'src/app/services/project/project.service';
import { UsersService } from 'src/app/services/users';

@Component({
  selector: 'app-done-vs-planned',
  templateUrl: './done-vs-planned.component.html',
  styleUrls: ['./done-vs-planned.component.css']
})
export class DoneVsPlannedComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Planned tasks' },
    { data: [], label: 'Finished tasks' }
  ];
  public chartReady : boolean = false;

  constructor(private usersService: UsersService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.usersService.getTasksPerRoles(this.authService.getLoggedUser().project_id).subscribe(data => {
      let datasetPlanned = [];
      let datasetFinished = [];
      let labels = []
      for(let role in data){
        labels.push(role)
        datasetPlanned.push(data[role].totalTasks)
        datasetFinished.push(data[role].completedTasks)
      }
      this.barChartLabels = labels;
      this.barChartData[0].data = datasetPlanned;
      this.barChartData[1].data = datasetFinished;
      this.chartReady = true;
    })
  }

}
