import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/core/services/api-data.service';
import { AuthapiService } from 'src/app/core/services/authapi.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthapiService: AuthapiService, private _Router: Router, private _ApiDataService: ApiDataService) {
  }

  cartQuantity: any;

  userData:any ;


  ngOnInit(): void {
    this._ApiDataService.getCartDetails().subscribe({
      next: (response) => {
        if (response.numOfCartItems > 0)
          this.cartQuantity = response.numOfCartItems;
      },
      error: (err) => {
        this.cartQuantity = 0;
      }
    })
    // get any changed value on cart item's quantity
    this._ApiDataService.cartCounter.subscribe({
      next: (data) => {
        this.cartQuantity = data;
      }
    })

    this._ApiDataService.getWishlistDetails().subscribe({
      next: (response) => {
        this._ApiDataService.wishlistGlobal.next(response)
      },
      error: (err) => {
        this._ApiDataService.wishlistGlobal.next(err)
      }
    })

    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this._ApiDataService.userData.next(JSON.stringify(this.userData))

    // get any changed value on cart item's quantity
    this._ApiDataService.userData.subscribe({
      next: (data) => {
      this.userData = JSON.parse(data || '{}');
      }
    })
  }



  signOutUser() {
    this._AuthapiService.signOut();
    this._Router.navigate(['/login']);
  }




}
