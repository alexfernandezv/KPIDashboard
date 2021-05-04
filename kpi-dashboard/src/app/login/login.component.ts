import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { UsersService } from '../users/users.service';
import {  MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  public loginInvalid = false;
  private formSubmitAttempt = false;
  returnUrl: string = '';
  get f() { return this.loginForm.controls; }

  constructor(
      private formBuilder: FormBuilder,
      private userService: UsersService,
      private _snackBar: MatSnackBar,
      private router: Router
  ) {
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  
  

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      const user={email: this.loginForm.controls['username'].value, password: this.loginForm.controls['password'].value }
      this.userService.login(user).subscribe(data => {
        this.userService.setToken(data.token);
        this._snackBar.open("Logged in successfully", "", {
          duration: 3000
        });
        this.router.navigate([''])
      }, error => {
        this._snackBar.open("Wrong credentials. Try again", "", {
          duration: 3000
        });
        this.loginInvalid = true;
      });
    }
  }
}

