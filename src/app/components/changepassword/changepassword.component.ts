import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/core/services/api-data.service';
import { AuthapiService } from 'src/app/core/services/authapi.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
  constructor(
    private _AuthapiService: AuthapiService,
    private _ApiDataService: ApiDataService,
    private _ToastrService:ToastrService,
    private _Router:Router,
    ) {
  }

  responseMsg: any;
  isLoading: boolean = false;

  inputChange(e: any) {
    if (e.target.value.length > 0)
      e.target.previousElementSibling?.classList.add("top-0");
    else
      e.target.previousElementSibling?.classList.remove("top-0");
  }


  changePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/), Validators.required]),
    rePassword: new FormControl(null),
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

  handleChangePassword() {

    this.isLoading = true;
    if (this.changePasswordForm.valid) {
      this._AuthapiService.changeUserPassword(this.changePasswordForm.value).subscribe({
        next: (response) => {
          this.responseMsg = response
          if (response.message === "success") {
            this._ToastrService.success("Account password changed successfully, Please login again", 'Account');
            localStorage.setItem('userToken', response.token)
            this.isLoading = false;
            this._AuthapiService.signOut();
            this._Router.navigate(['/login'])
          }
        },
        error: (error) => {
          this.responseMsg = error.error.errors.msg;
          this._ToastrService.error(this.responseMsg, 'Account');

          this.isLoading = false;
          console.log(error)

        }
      })
    }
    else{
      this.changePasswordForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
}


