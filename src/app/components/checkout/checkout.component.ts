import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/core/services/api-data.service';
import { AuthapiService } from 'src/app/core/services/authapi.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _ApiDataService: ApiDataService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
  ) { }


  responseMsg: any;
  userDetails: any;
  isLoading: boolean = false;
  paymentSelected: boolean = false;
  cartID: any = null;

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartID = params.get('id');
      }
    })

    this.userDetails = this._ApiDataService.getUserData();

  }



  inputChange(e: any) {
    if (e.target.value.length > 0)
      e.target.previousElementSibling?.classList.add("top-0");
    else
      e.target.previousElementSibling?.classList.remove("top-0");

  }

  selectChange(e: any) {
    if (e.target.value != "notSelected") {
      e.target.previousElementSibling?.classList.add("top-0");
      e.target.classList.add('is-valid')
      e.target.classList.remove('is-invalid');
      this.paymentSelected = true;
    }
    else {
      e.target.previousElementSibling?.classList.remove("top-0");
      e.target.classList.remove('is-valid')
      e.target.classList.add('is-invalid');
      this.paymentSelected = false;
    }
  }


  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
  });

  handleCheckOut(paymentInput: HTMLSelectElement) {
    this.isLoading = true;

    if (this.checkOutForm.valid) {
      if (paymentInput.value != "notSelected") {
        if (paymentInput.value == "cash") {
          this._ApiDataService.cartCashPayment(this.cartID, this.checkOutForm.value).subscribe({
            next: (response) => {
              this.responseMsg = response;
              if (response.status === "success") {
                this._Router.navigate(['/allorders']);
                this.isLoading = false;
                this._ApiDataService.cartCounter.next(0);
              }
            },
            error: (error) => {
              this.responseMsg = error;
              console.log(this.responseMsg)
              this.isLoading = false;

            }
          })
        }
        else if (paymentInput.value == "visa") {
          this._ApiDataService.cartOnlinePayment(this.cartID, this.checkOutForm.value).subscribe({
            next: (response) => {
              this.responseMsg = response;
              if (response.status === "success") {
                this.isLoading = false;
                window.open(response.session.url, '_self');
              }
            },
            error: (error) => {
              this.responseMsg = error;
              console.log(this.responseMsg)
              this.isLoading = false;
            }
          })
        }
      }
      else{
        this.isLoading = false;
        paymentInput.classList.add('is-invalid');
      }
    }
    else{
      this.checkOutForm.markAllAsTouched();
      this.isLoading = false;
      paymentInput.classList.add('is-invalid');
    }

  }

}
