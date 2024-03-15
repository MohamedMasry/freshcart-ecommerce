import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {


  BaseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  apiHeader: any = { token: localStorage.getItem('userToken') };
  cartCounter: BehaviorSubject<number> = new BehaviorSubject(0);
  wishlistGlobal: BehaviorSubject<any> = new BehaviorSubject(null);
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _ToastrService: ToastrService) {

  }

  userDetails: any;

  getUserData() {
    if (localStorage.getItem('userToken') != null) {
      let encodeToken: any = localStorage.getItem('userToken');
      let decodeToken = jwtDecode(encodeToken);

      this.userDetails = decodeToken;
      return this.userDetails;
    }
  }


  // Categories

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}categories`);
  }

  getSubCategory(catID: string): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}categories/${catID}/subcategories`);
  }

  // Brands

  getBrandsByPages(numberOfPage: number): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}brands?page=${numberOfPage}`);
  }



  //Products

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}products`);
  }

  getProductDetails(prodID: string): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}products/${prodID}`);
  }

  getProductsByPages(numberOfPage: number): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}products?page=${numberOfPage}`);
  }

  //Cart

  addToCart(prodID: string): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}cart`, { productId: prodID });
  }

  getCartDetails(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}cart`);
  }

  removeCartItem(prodID: string): Observable<any> {
    return this._HttpClient.delete(`${this.BaseUrl}cart/${prodID}`);
  }

  editCartQuantity(prodID: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this.BaseUrl}cart/${prodID}`, { count: count });
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.BaseUrl}cart`);
  }

  // Orders

  cartCashPayment(cartID: string, userData: object): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}orders/${cartID}`, {
      shippingAddress: userData,
    });
  }

  cartOnlinePayment(cartID: string, userData: object): Observable<any> {
    let currentRoute = window.location.host;
    return this._HttpClient.post(`${this.BaseUrl}orders/checkout-session/${cartID}?url=http://${currentRoute}/freshcart-ecommerce`, {
      shippingAddress: userData,
    });
  }
  getUserOrders(userID: any): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}orders/user/${userID}`);
  }

  //Wishlist

  addWishlist(prodID: string): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}wishlist`, { productId: prodID });
  }

  getWishlistDetails(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}wishlist`);
  }

  removeWishlistItem(prodID: string): Observable<any> {
    return this._HttpClient.delete(`${this.BaseUrl}wishlist/${prodID}`);
  }

  //User Addresses

  getUserAddresses(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}addresses`);
  }

  addUserAddress(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}addresses`, userData);
  }

  removeUserAddress(addID: string): Observable<any> {
    return this._HttpClient.delete(`${this.BaseUrl}addresses/${addID}`);
  }









}
