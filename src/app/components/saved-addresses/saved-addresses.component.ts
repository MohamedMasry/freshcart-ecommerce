import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/core/services/api-data.service';
import { AuthapiService } from 'src/app/core/services/authapi.service';

@Component({
  selector: 'app-saved-addresses',
  templateUrl: './saved-addresses.component.html',
  styleUrls: ['./saved-addresses.component.scss']
})
export class SavedAddressesComponent implements OnInit{
  constructor(
    private _ApiDataService: ApiDataService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
    ) {
  }

  responseMsg: any;
  savedAddresses: any;
  isLoading: boolean = false;

  ngOnInit(): void {
    this._ApiDataService.getUserAddresses().subscribe({
      next: (response) => {
        this.responseMsg = response;
        if (response.status === "success") {
          this.savedAddresses = response
        }
      },
      error: (error) => {
        this.responseMsg = error;
        console.log(error)

      }
    })
  }

  inputChange(e: any) {
    if (e.target.value.length > 0)
      e.target.previousElementSibling?.classList.add("top-0");
    else
      e.target.previousElementSibling?.classList.remove("top-0");
  }

  removeAddress(addressID: string, addressContainer: HTMLLIElement, deleteBtn: HTMLButtonElement){
    this._Renderer2.setAttribute(deleteBtn, 'disabled', 'true')

    this._ApiDataService.removeUserAddress(addressID).subscribe({
      next: (response) => {
        this._Renderer2.setAttribute(deleteBtn, 'disabled', 'false')
        this._Renderer2.addClass(addressContainer, 'deleting')
        this._ToastrService.success("Address Removed Successfully", 'Address');

        setTimeout(() => {
          if(response.data.length > 0)
          this.savedAddresses = response
          else
          this.savedAddresses = null;
        }, 500);
      },
      error: (err) => {
        this._ToastrService.error("There is an error removing this item", 'Address');
      }
    })
  }


  addAddressForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.maxLength(20), Validators.required]),
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(?:\+?2)?(01)[0125]\d{8}$/)]),
    city: new FormControl(null, [Validators.required]),
  });

  handleAddAddress() {
    this.isLoading = true;
    if (this.addAddressForm.valid) {
      this._ApiDataService.addUserAddress(this.addAddressForm.value).subscribe({
        next: (response) => {
          this.responseMsg = response
          if (response.status === "success") {
            this._ToastrService.success("Address Added successfully", 'Addresses');
            this.isLoading = false;
            this.savedAddresses = response
          }
        },
        error: (error) => {
          this.responseMsg = error.error.errors.msg;
          this._ToastrService.warning(this.responseMsg, 'Addresses');
          this.isLoading = false;
          console.log(error)

        }
      })
    }
    else{
      this.addAddressForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
}
