import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-mini-card',
  templateUrl: './filter-mini-card.component.html',
  styleUrls: ['./filter-mini-card.component.css']
})
export class FilterMiniCardComponent implements OnInit {
  
  @Input() title: string;
  @Input() color: string;
  constructor() { }

  ngOnInit(): void {
  }

}
