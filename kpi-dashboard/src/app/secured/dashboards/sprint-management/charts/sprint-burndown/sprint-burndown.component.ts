import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthenticationService } from 'src/app/services/authentication';
import { SprintService } from 'src/app/services/sprint/sprint.service';

@Component({
  selector: 'app-sprint-burndown',
  templateUrl: './sprint-burndown.component.html',
  styleUrls: ['./sprint-burndown.component.css']
})
export class SprintBurndownComponent implements OnInit {
  private _sprintId: number;
  @Input() set sprintId(value: number) {
    
    this._sprintId = value;
    this.retrieveBurndownPoints();
 
  }
 
  get sprintId(): number {
 
     return this._sprintId;
 
  }
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Remaining effort' }, { data: [], label: 'Ideal effort', borderDash: [5,5] },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'User Stories'
         },
         ticks: {
          stepSize: 1,
          beginAtZero: true
        }
      }],
      xAxes: [{
        scaleLabel: {
           display: true,
           labelString: 'Days in the Sprint'
        }
     }],
   },
   elements: {
    line: {
            fill: false
    }
  }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public chartReady = false;
  constructor(private sprintService: SprintService, private authService: AuthenticationService) { }
  
  ngOnInit() {
    
  
  }
  retrieveBurndownPoints(): void{
    this.lineChartData[0].data.splice(0);
    this.lineChartData[1].data.splice(0);
    this.lineChartLabels.splice(0);
    this.sprintService.getBurndownPoints(this.authService.getLoggedUser().project_id,this.sprintId).subscribe(data => {
      this.lineChartLabels.push("0")
      this.lineChartLabels.push(Math.round(data.sprintDays/3).toString())
      this.lineChartLabels.push(Math.round(data.sprintDays/3 * 2).toString())
      this.lineChartLabels.push(Math.round(data.sprintDays/3 *3 ).toString())
      this.lineChartData[0].data.push(data.totalTasks)
      this.lineChartData[0].data.push(data.totalTasks - data.tasksCompleted1)
      this.lineChartData[0].data.push((data.totalTasks - data.tasksCompleted1) - data.tasksCompleted2)
      this.lineChartData[0].data.push((data.totalTasks - data.tasksCompleted1 - data.tasksCompleted2) - data.tasksCompleted3)
      this.lineChartData[1].data.push(data.totalTasks)
      this.lineChartData[1].data.push(data.totalTasks-data.totalTasks/3)
      this.lineChartData[1].data.push((data.totalTasks-data.totalTasks/3)-data.totalTasks/3)
      this.lineChartData[1].data.push((data.totalTasks-data.totalTasks/3-data.totalTasks/3)-data.totalTasks/3)
      
      
      this.chartReady = true;
      });
  }
}
