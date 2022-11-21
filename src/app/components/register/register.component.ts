import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthRegister } from 'src/app/interfaces/auth-register';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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

  agregarUsuario(){

    const _user: AuthRegister = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    }

    this._userService.register(_user).subscribe({
      next: (data) => {
        console.log(data);
        if(data.status){
          this._snackBar.open(data.message, "Exito", { duration: 3000 });
          setTimeout(() => {
            this.router.navigateByUrl("/login")
          }, 3000)
          
        }else{
          this._snackBar.open(data.message, "Error", { duration: 3000 });
        }
      }, 
      error: (e) => {
        console.log(e)
      },
      complete: () => {
      }
    })
  }



}
