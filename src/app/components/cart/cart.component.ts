import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/core/services/api-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private _ApiDataService: ApiDataService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _Router:Router) {

  }

  cartData: any;
  cartResponse: any = null;

  ngOnInit(): void {
    this._ApiDataService.getCartDetails().subscribe({
      next: (response) => {
        this.cartData = response.data;
        if(response.numOfCartItems >0)
        this.cartResponse = response;
        else
        this.cartResponse = null;
      },
      error: (err) => {
        this._ToastrService.info("Your  is Empty", 'Cart');
      }
    })
  }

  removeCartItem(prodID: string, productContainer: HTMLLIElement, deleteBtn: HTMLButtonElement) {
    this._Renderer2.setAttribute(deleteBtn, 'disabled', 'true')

    this._ApiDataService.removeCartItem(prodID).subscribe({
      next: (response) => {
        this._Renderer2.setAttribute(deleteBtn, 'disabled', 'false')
        this._Renderer2.addClass(productContainer, 'deleting')
        this._ToastrService.success("Product Removed Successfully", 'Cart');
        this._ApiDataService.cartCounter.next(response.numOfCartItems);
        setTimeout(() => {
          this.cartData = response.data;

          if(response.numOfCartItems >0)
          this.cartResponse = response;
          else
          this.cartResponse = null;

        }, 500);
      },
      error: (err) => {
        this._ToastrService.error("There is an error removing this item", 'Cart');
      }
    })
  }

  editCartQuantity(prodID: string, count: number) {
    this._ApiDataService.editCartQuantity(prodID, count).subscribe({
      next: (response) => {

        this._ApiDataService.cartCounter.next(response.numOfCartItems);
        this.cartData = response.data;
        this.cartResponse = response;

      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Cart');
      }
    })
  }

  clearCart(cartCont:HTMLDivElement,clearBtn: HTMLButtonElement) {
    this._Renderer2.setAttribute(clearBtn, 'disabled', 'true')

    this._ApiDataService.clearCart().subscribe({
      next: (response) => {
        if(response.message === "success"){
          this._Renderer2.setAttribute(clearBtn, 'disabled', 'false');
          this._ToastrService.success("Cart Cleared Successfully", 'Cart');
          this._ApiDataService.cartCounter.next(0);    
          this._Renderer2.addClass(cartCont, 'deleting');
          setTimeout(() => {
            this.cartResponse = null;
          }, 500);
        }
      },
      error: (err) => {
        this._Renderer2.setAttribute(clearBtn, 'disabled', 'false');
        console.log(err);
        this._ToastrService.error("There is an error clearing cart", 'Cart');
      }
    })
  }



}
