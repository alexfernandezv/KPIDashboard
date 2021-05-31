import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthenticationService } from 'src/app/services/authentication';
import { SprintService } from 'src/app/services/sprint/sprint.service';

@Component({
  selector: 'app-sprint-velocity',
  templateUrl: './sprint-velocity.component.html',
  styleUrls: ['./sprint-velocity.component.css']
})
export class SprintVelocityComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Tasks'
         },
         ticks: {
          stepSize: 1,
          beginAtZero: true
        }
      }]
   }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Estimated Tasks' },
    { data: [], label: 'Completed Tasks' }
  ];
  public chartReady : boolean = false;
  constructor(private sprintService: SprintService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.sprintService.getTasks(this.authService.getLoggedUser().project_id).subscribe(data => {
      for(let s in data){
         this.barChartLabels.push("Sprint".concat(s));
         this.barChartData[0].data.push(data[s].totalTasks)
         this.barChartData[1].data.push(data[s].completedTasks)
       }
      this.chartReady = true;
     })
  }

}
