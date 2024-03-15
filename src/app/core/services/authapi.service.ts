import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {
  constructor(private _HttpClient: HttpClient) { }

  baseUrlAuth: string = 'https://ecommerce.routemisr.com/api/v1/auth/';
  baseUrlUser: string = 'https://ecommerce.routemisr.com/api/v1/users/';
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  codeVerfied!: boolean;

  signUp(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrlAuth}signup`, userData);
  }
  signIn(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrlAuth}signin`, userData);
  }

  signOut(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  }


  forgetPass(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrlAuth}forgotPasswords`, userData);
  }

  verifyCode(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrlAuth}verifyResetCode`, userData);
  }

  resetPass(userData: object): Observable<any> {
    return this._HttpClient.put(`${this.baseUrlAuth}resetPassword`, userData);
  }

  //user

  changeUserDetails(userData: object): Observable<any> {
    return this._HttpClient.put(`${this.baseUrlUser}updateMe/`, userData);
  }

  changeUserPassword(userData: object): Observable<any> {
    return this._HttpClient.put(`${this.baseUrlUser}changeMyPassword`, userData);
  }







}
