import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthapiService } from 'src/app/core/services/authapi.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private _AuthapiService: AuthapiService,
    private _Router: Router,
    private _ToastrService: ToastrService) { }

  errorMsg:string = '';
  isLoading: boolean = false;

  inputChange(e: any) {
    if (e.target.value.length > 0)
      e.target.previousElementSibling?.classList.add("top-0");
    else
      e.target.previousElementSibling?.classList.remove("top-0");
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(25), Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/), Validators.required]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(?:\+?2)?(01)[0125]\d{8}$/)]),
  }, { validators: [this.confirmPassword] } as FormControlOptions);

  confirmPassword(form: FormGroup): void {
    let password = form.get('password');
    let rePassword = form.get('rePassword');

    if (rePassword?.value == null || rePassword?.value == '') {
      rePassword?.setErrors({ required: true })
    }
    else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true })
    }
  }

  handleRegister() {

    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthapiService.signUp(this.registerForm.value).subscribe({
        next: (response) => {

          if (response.message === "success") {
            this._ToastrService.success("Account Registered Successfully", 'Authentication');
            this._Router.navigate(['/login'])
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.errorMsg = error.message;
          this._ToastrService.warning(this.errorMsg, 'Authentication');
          this.isLoading = false;


        }
      })
    }
  }
}
