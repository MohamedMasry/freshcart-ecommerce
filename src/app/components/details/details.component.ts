import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/core/services/api-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApiDataService: ApiDataService,
    private _Title: Title,
    private _ToastrService: ToastrService) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,

  }

  productDetails: any;
  productId: any;
  errorMsg: any;

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
        this._ApiDataService.getProductDetails(this.productId).subscribe({
          next: (response) => {
            this.productDetails = response.data;
            this._Title.setTitle(this.productDetails.title + ' - Details')

          },
          error: (error) => {
            this.errorMsg = error;
            console.log(this.errorMsg)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })


    // get any value in wishlist

    this.getWishlistData();
    this._ApiDataService.wishlistGlobal.subscribe({
      next: (res) => {
        this.wishlistData = res?.data.map((n: any) => n.id);
      }
    })
  }

  addToCart() {
    this._ApiDataService.addToCart(this.productId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, 'Cart');
        this._ApiDataService.cartCounter.next(response.numOfCartItems);
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Cart');
      }
    })
  }

  responseMsg: string = ''
  wishlistData: any = [];

  addToWishlist(prodID: string) {
    this._ApiDataService.addWishlist(prodID).subscribe({
      next: (response) => {
        this.wishlistData = response?.data;
        this.responseMsg = response.status;
        this._ToastrService.success(response.message, 'Wishlist');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Wishlist');
      }
    })
  }

  removeWishlistProduct(prodID: string) {
    this._ApiDataService.removeWishlistItem(prodID).subscribe({
      next: (response) => {
        this.wishlistData = response?.data;
        this.responseMsg = response.status;
        this._ToastrService.success("Product Removed Successfully", 'Wishlist');
      },
      error: (err) => {
        this._ToastrService.error("There is an error removing this item", 'Wishlist');
      }
    })
  }


  toggleWishlist(id: string, wishlistBtn: HTMLButtonElement) {
    let isInWishlist = this.activeWishlist(id);

    if (isInWishlist != true) {
      wishlistBtn.classList.add('active');
      this.addToWishlist(id);
    }
    else {
      wishlistBtn.classList.remove('active');
      this.removeWishlistProduct(id);
    }

  }

  getWishlistData() {
    this._ApiDataService.getWishlistDetails().subscribe({
      next: (response) => {
        this._ApiDataService.wishlistGlobal.next(response);
        this.wishlistData = response?.data.map((n: any) => n.id);
        this.responseMsg = response.status;
      },
      error: (err) => {
        this._ApiDataService.wishlistGlobal.next(err);
      }
    })
  }

  activeWishlist(prodID: string) {

    return this.wishlistData?.includes(prodID);
  }


}
