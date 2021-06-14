import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.authService.isUserLogged()){
      this.authService.logout()
    }
  }

}
