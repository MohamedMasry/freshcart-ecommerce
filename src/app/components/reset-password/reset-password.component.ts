import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthapiService } from 'src/app/core/services/authapi.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(
    private _AuthapiService: AuthapiService,
    private _Router: Router,
    private _ToastrService:ToastrService) {

  }

  responseMsg: any;
  isLoading: boolean = false;
  
  inputChange(e: any) {
    if (e.target.value.length > 0)
      e.target.previousElementSibling?.classList.add("top-0");
    else
      e.target.previousElementSibling?.classList.remove("top-0");
  }

  resetPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    newPassword: new FormControl(null, [Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/), Validators.required]),
  });

  handleReset() {
    this.isLoading = true;
    if (this.resetPassForm.valid) {
      this._AuthapiService.resetPass(this.resetPassForm.value).subscribe({
        next: (response) => {
          this.responseMsg = response
          this._ToastrService.success(this.responseMsg, 'Reset Password');
          if (response.statusMsg != "fail") {
            this._ToastrService.success(response.statusMsg, 'Reset Password');
            this.isLoading = false;
            this._AuthapiService.codeVerfied = false;
            this._Router.navigate(['./login'])
            //NEED TOASTER
          }
        },

        error: (error) => {
          this.responseMsg = error.error;
          console.log(this.responseMsg)
          this.isLoading = false;

        }
      })
    }
  }
}
