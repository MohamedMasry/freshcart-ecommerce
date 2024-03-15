import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/core/services/api-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ApiDataService: ApiDataService,
    private _ToastrService: ToastrService,
  ) {
  }

  productsData: any;
  currentPage: number = 1;
  numberOfPages:number[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.getProductsByPages(this.currentPage);

    
    // get any value in wishlist

    this.getWishlistData();
    this._ApiDataService.wishlistGlobal.subscribe({
      next: (res) => {
        this.wishlistData = res?.data.map((n: any) => n.id);
      }
    })

    
  }

  getProductsByPages(currentPage:number){
    this.currentPage = currentPage;
    this._ApiDataService.getProductsByPages(currentPage).subscribe({
      next: (response) => {
        this.productsData = response.data;
        if(this.numberOfPages.length ==0){
          for (let number = 1; number <= response.metadata.numberOfPages; number++) {
            this.numberOfPages.push(number)
          }
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  searchFilterByName(products: any, productName: string) {
    return products?.filter((item: any) => item.title.toLowerCase().includes(productName.toLowerCase()))

  }

  inputChange(e: any) {
    this.searchTerm = e.target.value;
    if (e.target.value.length > 0) {
      e.target.previousElementSibling?.classList.add("top-0");
    }

    else {
      e.target.previousElementSibling?.classList.remove("top-0");
    }

  }


  addToCart(id: string) {
    this._ApiDataService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, 'Cart');
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
