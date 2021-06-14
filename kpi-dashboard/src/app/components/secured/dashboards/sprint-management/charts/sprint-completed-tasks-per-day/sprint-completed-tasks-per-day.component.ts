import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthenticationService } from 'src/app/services/authentication';
import { SprintService } from 'src/app/services/sprint/sprint.service';

@Component({
  selector: 'app-sprint-completed-tasks-per-day',
  templateUrl: './sprint-completed-tasks-per-day.component.html',
  styleUrls: ['./sprint-completed-tasks-per-day.component.css']
})
export class SprintCompletedTasksPerDayComponent implements OnInit {
  private _sprintId: number;
  @Input() set sprintId(value: number) {
    
    this._sprintId = value;
    this.retrieveCompletedTasksPoints();
 
  }
 
  get sprintId(): number {
 
     return this._sprintId;
 
  }
  public lineChartData: ChartDataSets[] = [
    { data: [], label: "Completed Story Points"},
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Story points'
         },
         ticks: {
          stepSize: 1,
          beginAtZero: true
        }
      }],
      xAxes: [{
        scaleLabel: {
           display: true,
           labelString: 'Days of Sprint'
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
  retrieveCompletedTasksPoints(): void{
    this.lineChartData[0].data.splice(0);
    this.lineChartLabels.splice(0);
    this.sprintService.getCompletedStoryPoints(this.authService.getLoggedUser().project_id,this.sprintId).subscribe(data => {
      for(let day in data){
        this.lineChartLabels.push(day)
        this.lineChartData[0].data.push(data[day])
      }
      this.chartReady = true;
      });
  }
}
