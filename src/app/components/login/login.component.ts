import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  hidePassword:boolean   = true;
  loading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _userService: UserService
  ) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onLogin() {
    this.loading = true;

    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;

    this._userService.authenticate(username, password).subscribe({
      next: (data) => {
        if (data.status) {
          localStorage.setItem('token', data.result.token)
          this.router.navigate(['pages'])
        } else {
          this._snackBar.open(data.message, 'Oops!', { duration: 3000 });
        }
        
      },
      error: (e) => {
        this._snackBar.open("hubo un error", 'Oops!', { duration:3000 });
      },
      complete: () => {
        this.loading = false;
      }
    })

  }

}
