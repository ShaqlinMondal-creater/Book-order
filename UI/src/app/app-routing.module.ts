import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { ViewallbooksComponent } from './viewallbooks/viewallbooks.component';
import { OrderpageComponent } from './orderpage/orderpage.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewallorderComponent } from './viewallorder/viewallorder.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { AdminguardGuard } from './auth-guard/adminguard.guard';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { SearchbookComponent } from './searchbook/searchbook.component';
import { SellerregisterComponent } from './sellerregister/sellerregister.component';
import { SellerloginComponent } from './sellerlogin/sellerlogin.component';
import { ViewallsellerComponent } from './viewallseller/viewallseller.component';
import { SellerproductsComponent } from './sellerproducts/sellerproducts.component';
import { OrdersviewbysellerComponent } from './ordersviewbyseller/ordersviewbyseller.component';
import { SellerGuard } from './auth-guard/seller.guard';
import { SellerprofileComponent } from './sellerprofile/sellerprofile.component';
import { AdminpasswordchngeComponent } from './adminpasswordchnge/adminpasswordchnge.component';
import { SellerpassqordchngComponent } from './sellerpassqordchng/sellerpassqordchng.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-order-api.vercel.app/home',
    pathMatch: 'full',
  },
 
  {
    path:'pagenotfound',
    component:PagenotfoundComponent
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
 
 {
  path:'profile',
  component:ProfileComponent,
  canActivate:[AuthGuard]
 },
 {
  path:'productadd',
  component:ProductaddComponent,
  canActivate:[SellerGuard]
 },
 {
  path:'viewuser',
  component:ViewuserComponent,
  canActivate:[ AdminguardGuard]
 },
 {
  path:'viewallproduct',
  component:ViewallbooksComponent,
  canActivate:[ AdminguardGuard]
 },
 {
  path:'orderplace',
  component:OrderpageComponent,

 },
 {
  path:'orders',
  component:OrdersComponent,
  canActivate:[AuthGuard]
 },
 {
  path:'viewallorder',
  component:ViewallorderComponent,
  canActivate:[ AdminguardGuard]
 },
 {
  path:'addtocart',
  component:AddtocartComponent,
  canActivate:[AuthGuard]
 },

 {
  path:'admin',
  component:AdminloginComponent
 },
 {
  path:'updatepassword',
  component:UpdatepasswordComponent,
  canActivate:[AuthGuard]
 },
 {
  path:'resetpassword',
  component:ResetpasswordComponent,
 },
 {
  path:'viewproduct',
  component:ViewproductComponent
 },
 {
  path:'booksearch',
  component:SearchbookComponent,
 },
 {
  path:'sellerregister',
  component:SellerregisterComponent,
},
{
  path:'sellerlogin',
  component:SellerloginComponent
},
{path:'viewallseller',component:ViewallsellerComponent,canActivate:[ AdminguardGuard]},
{path:'adminpassword',component:AdminpasswordchngeComponent,canActivate:[ AdminguardGuard]},
{path:'productbyseller',component:SellerproductsComponent,canActivate:[SellerGuard]},
{path:'orderview',component:OrdersviewbysellerComponent,canActivate:[SellerGuard]},
{path:'sellerprofile',component:SellerprofileComponent,canActivate:[SellerGuard]},
{path:'passwordseller',component:SellerpassqordchngComponent,canActivate:[SellerGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
