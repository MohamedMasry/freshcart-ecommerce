import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/core/services/api-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(
    private _ApiDataService: ApiDataService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _Router:Router) {
  }

  wishlistData: any;
  wishlistResponse: any = null;

  ngOnInit(): void {

    this.getWishlistDetails();

  }
  getWishlistDetails(){
    this._ApiDataService.getWishlistDetails().subscribe({
      next: (response) => {
        this.wishlistData = response.data;
        if(response.data.length >0)
        this.wishlistResponse = response;
        else
        this.wishlistResponse = null;
      },
      error: (err) => {
        this._ToastrService.info("Your Wishlist is Empty", 'Wishlist');
      }
    })
  }




  removeWishlistItem(prodID: string, productContainer: HTMLLIElement, deleteBtn: HTMLButtonElement) {
    this._Renderer2.setAttribute(deleteBtn, 'disabled', 'true')

    this._ApiDataService.removeWishlistItem(prodID).subscribe({
      next: (response) => {
        this._Renderer2.setAttribute(deleteBtn, 'disabled', 'false')
        this._Renderer2.addClass(productContainer, 'deleting')
        this._ToastrService.success("Product Removed Successfully", 'Wishlist');
        this.getWishlistDetails();
        setTimeout(() => {
          if(response.data.length > 0)
          this.wishlistResponse = response;
          else
          this.wishlistResponse = null;
        }, 500);
      },
      error: (err) => {
        this._ToastrService.error("There is an error removing this item", 'Wishlist');
      }
    })
  }

  
  addToCart(id: string) {
    this._ApiDataService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, 'Cart');
        this._ApiDataService.cartCounter.next(response.numOfCartItems);
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Cart');
      }
    })
  }




}
