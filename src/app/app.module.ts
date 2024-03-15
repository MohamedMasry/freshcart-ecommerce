import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyApiClientInterceptor } from './core/interceptors/my-api-client.interceptor';
import { LoadingScreenInterceptor } from './core/interceptors/loading-screen.interceptor';
import { AllordersComponent } from './components/allorders/allorders.component';
import { AccountComponent } from './components/account/account.component';
import { ChangedetailsComponent } from './components/changedetails/changedetails.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { SavedAddressesComponent } from './components/saved-addresses/saved-addresses.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CategoriesComponent,
    DetailsComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    NavbarAuthComponent,
    NotfoundComponent,
    ProductsComponent,
    RegisterComponent,
    WishlistComponent,
    BrandsComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    CheckoutComponent,
    AllordersComponent,
    AccountComponent,
    ChangedetailsComponent,
    ChangepasswordComponent,
    SavedAddressesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:LoadingScreenInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:MyApiClientInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
