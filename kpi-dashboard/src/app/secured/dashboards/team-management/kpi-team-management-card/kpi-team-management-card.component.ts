import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kpi-team-management-card',
  templateUrl: './kpi-team-management-card.component.html',
  styleUrls: ['./kpi-team-management-card.component.css']
})
export class KpiTeamManagementCardComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
