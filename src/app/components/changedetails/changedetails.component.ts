import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/core/services/api-data.service';
import { AuthapiService } from 'src/app/core/services/authapi.service';

@Component({
  selector: 'app-changedetails',
  templateUrl: './changedetails.component.html',
  styleUrls: ['./changedetails.component.scss']
})
export class ChangedetailsComponent {
  constructor(
    private _AuthapiService: AuthapiService,
    private _ApiDataService: ApiDataService,
    private _ToastrService:ToastrService
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


  changeDetailsForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(25), Validators.required]),
    email: new FormControl(null, [Validators.email,Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(?:\+?2)?(01)[0125]\d{8}$/)]),
  });

  handleChangeDetails() {

    this.isLoading = true;
    if (this.changeDetailsForm.valid) {
      this._AuthapiService.changeUserDetails(this.changeDetailsForm.value).subscribe({
        next: (response) => {
          this.responseMsg = response
          if (response.message === "success") {
            this._ToastrService.success("Account details changed successfully", 'Account');
            localStorage.setItem('userData', JSON.stringify(response.user))
            this._ApiDataService.userData.next(JSON.stringify(response.user))
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.responseMsg = error.error.errors.msg;
          this._ToastrService.warning(this.responseMsg, 'Account');
          this.isLoading = false;
          console.log(error)

        }
      })
    }
    else{
      this.changeDetailsForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
}
