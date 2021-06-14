import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthenticationService } from 'src/app/services/authentication';
import { UsersService } from 'src/app/services/users';

@Component({
  selector: 'app-planned-vs-utilized',
  templateUrl: './planned-vs-utilized.component.html',
  styleUrls: ['./planned-vs-utilized.component.css']
})
export class PlannedVsUtilizedComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { //you're missing this
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Hours'
         }
      }]
   }
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Planned hours' },
    { data: [], label: 'Needed hours' }
  ];
  public chartReady : boolean = false;
  constructor(private usersService: UsersService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.usersService.getHoursPerRoles(this.authService.getLoggedUser().project_id).subscribe(data => {
      let datasetPlanned = [];
      let datasetNeeded = [];
      let labels = []
      for(let role in data){
        labels.push(role)
        datasetPlanned.push(data[role].hoursPlanned)
        datasetNeeded.push(data[role].hoursNeeded)
      }
      this.barChartLabels = labels;
      this.barChartData[0].data = datasetPlanned;
      this.barChartData[1].data = datasetNeeded;
      this.chartReady = true;
    })
  }

}
