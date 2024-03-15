import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthapiService } from 'src/app/core/services/authapi.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(
    private _AuthapiService: AuthapiService,
    private _Router: Router,
    private _ToastrService:ToastrService
    ) {

  }



  responseMsg: any;
  codeIsSent: boolean = false;
  timeLimit: number = 10
  waitingTime: any;
  waitingResend: boolean = true;
  isLoading: boolean = false;

  inputChange(e: any) {
    if (e.target.value.length > 0)
      e.target.previousElementSibling?.classList.add("top-0");
    else
      e.target.previousElementSibling?.classList.remove("top-0");
  }

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  });

  handleForget() {
    this.isLoading = true;
    if (this.forgetForm.valid) {
      this._AuthapiService.forgetPass(this.forgetForm.value).subscribe({
        next: (response) => {
          this.responseMsg = response
          console.log(response)
          if (response.statusMsg === "success") {
            this._ToastrService.info("Verify the code sent to your e-mail", 'Forget Password');
            this.codeIsSent = true;
            this.isLoading = false;
            this.resendCounter();
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

  resendCounter() {
    this.waitingTime = this.timeLimit;
    let counter = setInterval(() => {
      this.waitingTime -= 1;
      console.log(this.waitingTime)
      if (this.waitingTime == 0) {
        clearInterval(counter);
        this.waitingTime = 'Now'
      }
    }, 1000);
  }

  resendCode() {
    this._AuthapiService.forgetPass(this.forgetForm.value).subscribe({
      next: (response) => {
        if (response.statusMsg === "success") {
          this._ToastrService.info("Code resent successfully to your e-mail", 'Forget Password');
          this.resendCounter();
        }
      },

      error: (error) => {
        this.responseMsg = error.error;
        console.log(this.responseMsg)
        this.isLoading = false;

      }
    })
  }



  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  handleCode() {
    this.isLoading = true;
    if (this.forgetForm.valid) {
      this._AuthapiService.verifyCode(this.resetCodeForm.value).subscribe({
        next: (response) => {
          this.responseMsg = response
          console.log(response)
          if (response.status == "Success") {
            this.isLoading = false;
            this._AuthapiService.codeVerfied = true;
            this._Router.navigate(['./resetpassword'])
          }
        },

        error: (error) => {
          this._AuthapiService.codeVerfied = false;
          this.responseMsg = error.error;
          console.log(this.responseMsg)
          this.isLoading = false;

        }
      })
    }
  }

}
