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
  loading = false;
  submitted = false;
  returnUrl: string = '';

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

  
  get f() { return this.loginForm.controls; }
  onSubmit() {
      this.submitted = true;
      this.loading = true;
      const user={email: this.loginForm.controls['username'].value, password: this.loginForm.controls['password'].value }
      this.userService.login(user).subscribe(data => {
        this.userService.setToken(data.token);
        this._snackBar.open("Login successful", "", {
          duration: 3000
        });
        this.router.navigate([''])
      }, error => {
        this._snackBar.open("Wrong credentials. Try again", "", {
          duration: 3000
        });
      });
  }
}
function first(): any {
  throw new Error('Function not implemented.');
}

