import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css']
})
export class MiniCardComponent implements OnInit {
  @Input() icon: string;
  @Input() title: string;
  @Input() value: number = undefined;
  @Input() color: string;
  @Input() label: string = undefined;
  @Input() percentage: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if(this.value == undefined){
      this.value = 0;
    }
  }

}
