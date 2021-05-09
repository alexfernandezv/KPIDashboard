import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { UsersService } from '../../services/users/users.service';
import {  MatSnackBar} from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/users/authentication.service';
import { first } from 'rxjs/operators';
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
  model: any = {};
  loading = false;
  error = '';
  get f() { return this.loginForm.controls; }

  constructor(
      private formBuilder: FormBuilder,
      private userService: UsersService,
      private _snackBar: MatSnackBar,
      private router: Router,
      private authenticationService: AuthenticationService,
      private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
       // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  
  

  // onSubmit() {
  //   this.loginInvalid = false;
  //   this.formSubmitAttempt = false;
  //   if (this.loginForm.valid) {
  //     const user={email: this.loginForm.controls['username'].value, password: this.loginForm.controls['password'].value }
  //     this.userService.login(user).subscribe(data => {
  //       this.userService.setToken(data.token);
  //       this._snackBar.open("Logged in successfully", "", {
  //         duration: 3000
  //       });
  //       this.router.navigate(['/project'])
  //     }, error => {
  //       this._snackBar.open("Wrong credentials. Try again", "", {
  //         duration: 3000
  //       });
  //       this.loginInvalid = true;
  //     });
  //   }
  // }
  

logIn() {
    this.loading = true;
    this.authenticationService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).pipe(
        first())
        .subscribe(
            data => {
              this._snackBar.open("Logged in successfully", "", {
                         duration: 3000
                       });
                this.router.navigate(['/project'])
            },
            error => {
                this.error = error;
                this.loginInvalid = true;
                this.loading = false;
                this._snackBar.open("Wrong credentials. Try again", "", {
                           duration: 3000
                         });
            });
}
}

