import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthenticationService } from 'src/app/services/authentication';
import { UsersService } from 'src/app/services/users';

@Component({
  selector: 'app-bugs-per-role',
  templateUrl: './bugs-per-role.component.html',
  styleUrls: ['./bugs-per-role.component.css']
})
export class BugsPerRoleComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Bugs' },
  ];
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
      this.barChartLabels = labels;
      this.barChartData[0].data = datasetBug;
      this.chartReady = true;
    })
  }
}
