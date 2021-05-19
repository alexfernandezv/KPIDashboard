import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { AuthenticationService } from 'src/app/services/authentication';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-roles-chart',
  templateUrl: './roles-chart.component.html',
  styleUrls: ['./roles-chart.component.css']
})
export class RolesChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartReady = false;
  public roles:  Array<string> = [];
  constructor(private projectService: ProjectService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.projectService.getProjectRoles(this.authService.getLoggedUser().project_id).subscribe(data => {
      this.roles = data.roles;
      let dataset = [];
      let labels = []
      for(let r in this.roles){
        labels.push(r);
        dataset.push(parseFloat(this.roles[r]))
      }
      this.pieChartLabels = labels;
      this.pieChartData = dataset;
      this.chartReady = true;
    })
  }

}
