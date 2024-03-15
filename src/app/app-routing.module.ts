import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { authGuard } from './core/guards/auth.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { resetPassGuard } from './core/guards/reset-pass.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { authRevGuard } from './core/guards/auth-rev.guard';
import { AccountComponent } from './components/account/account.component';
import { ChangedetailsComponent } from './components/changedetails/changedetails.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { SavedAddressesComponent } from './components/saved-addresses/saved-addresses.component';

const routes: Routes = [

  {path:'', canActivate:[authGuard], component:NavbarComponent, children:[
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'Home'},
    {path:'cart',component:CartComponent,title:'Cart'},
    {path:'wishlist',component:WishlistComponent,title:'Wishlist'},
    {path:'products',component:ProductsComponent,title:'Products'},
    {path:'details/:id',component:DetailsComponent,title:'Product Details'},
    {path:'checkout/:id',component:CheckoutComponent,title:'Checkout'},
    {path:'allorders',component:AllordersComponent,title:'Orders'},
    {path:'categories',component:CategoriesComponent,title:'Categories'},
    {path:'brands',component:BrandsComponent,title:'Brands'},
    {path:'account',component:AccountComponent, children:[
      {path:'', redirectTo:'changedetails',pathMatch:'full'},
      {path:'changedetails',component:ChangedetailsComponent,title:'Change Account Details'},
      {path:'changepassword',component:ChangepasswordComponent,title:'Change Password'},
      {path:'addresses',component:SavedAddressesComponent,title:'Saved Addresses'},
    ]},
  ]},
  
  {path:'',canActivate:[authRevGuard],component:NavbarAuthComponent, children:[
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'},
    {path:'forgetpassword',component:ForgetPasswordComponent,title:'Forget Password'},
    {path:'resetpassword', canActivate:[resetPassGuard],component:ResetPasswordComponent,title:'Reset Password'},
  ]},

  {path:'**',component:NotfoundComponent,title:'Not Found Page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
