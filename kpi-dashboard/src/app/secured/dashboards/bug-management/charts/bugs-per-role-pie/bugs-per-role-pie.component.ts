import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { AuthenticationService } from 'src/app/services/authentication';
import { UsersService } from 'src/app/services/users';

@Component({
  selector: 'app-bugs-per-role-pie',
  templateUrl: './bugs-per-role-pie.component.html',
  styleUrls: ['./bugs-per-role-pie.component.css']
})
export class BugsPerRolePieComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartReady : boolean = false;
  
  constructor(private usersService: UsersService, private authService: AuthenticationService) { }
  ngOnInit() {
    this.usersService.getBugsPerRoles(this.authService.getLoggedUser().project_id).subscribe(data => {
      let datasetBug = [];
      let labels = []
      for(let role in data){
        labels.push(role)
        datasetBug.push(data[role].bugs)
      }
      this.pieChartLabels = labels;
      this.pieChartData = datasetBug;
      this.chartReady = true;
    })
  }

}
