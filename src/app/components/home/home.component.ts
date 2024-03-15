import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/core/services/api-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _ApiDataService: ApiDataService,
    private _ToastrService: ToastrService,
  ) {
  }


  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    startPosition:1,
    dots: true,
    navSpeed: 600,
    animateOut: 'animate__animated animate__slideOutDown',
    animateIn: 'animate__animated animate__fadeInDown',
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false,

  }

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
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false,

  }

  productsData: any;
  categoriesData: any;
  searchTerm: string = '';
  responseMsg: string = ''
  wishlistData: any = [];

  ngOnInit(): void {

    this._ApiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    })

    this._ApiDataService.getAllCategories().subscribe({
      next: (response) => {
        this.categoriesData = response;
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
