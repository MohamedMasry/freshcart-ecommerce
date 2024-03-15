import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthapiService } from 'src/app/core/services/authapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private _AuthapiService: AuthapiService, private _Router: Router) {
  }

  responseMsg: any;
  isLoading: boolean = false;

  inputChange(e: any) {
    if (e.target.value.length > 0)
      e.target.previousElementSibling?.classList.add("top-0");
    else
      e.target.previousElementSibling?.classList.remove("top-0");
  }


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email,Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  handleLogin() {

    this.isLoading = true;
    if (this.loginForm.valid) {
      this._AuthapiService.signIn(this.loginForm.value).subscribe({
        next: (response) => {
          this.responseMsg = response
          if (response.message === "success") {
            localStorage.setItem('userToken', response.token)
            localStorage.setItem('userData', JSON.stringify(response.user))
            this._Router.navigate(['/home'])
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.responseMsg = error.error;
          this.isLoading = false;

        }
      })
    }
  }
}
