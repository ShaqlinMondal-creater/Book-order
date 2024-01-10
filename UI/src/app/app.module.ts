import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { Userdetails } from './models/userdetails';

import { ViewuserComponent } from './viewuser/viewuser.component';
import { ProfileComponent } from './profile/profile.component';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';
import { environment } from 'src/environments/environment';
import { FileUploadModule } from 'ng2-file-upload';
import { RegisterComponent } from './register/register.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ExportAsModule } from 'ngx-export-as';
import { ViewallbooksComponent } from './viewallbooks/viewallbooks.component';
import { Bookdetails } from './models/bookdetails';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { UpdatebooksComponent } from './updatebooks/updatebooks.component';
import { OrderpageComponent } from './orderpage/orderpage.component';
import { Orderdetails } from './models/orderdetails';
import { OrdersComponent } from './orders/orders.component';
import { ViewallorderComponent } from './viewallorder/viewallorder.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Cartdetails } from './models/cartdetails';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { DataTablesModule } from 'angular-datatables';
import { Admin } from './models/admin';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { Otpsend } from './models/otpsend';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { AdminguardGuard } from './auth-guard/adminguard.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { SearchbookComponent } from './searchbook/searchbook.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { SellerregisterComponent } from './sellerregister/sellerregister.component';
import { SellerloginComponent } from './sellerlogin/sellerlogin.component';
import { Sellerdetails } from './models/sellerdetails';
import { ViewallsellerComponent } from './viewallseller/viewallseller.component';
import { SellerproductsComponent } from './sellerproducts/sellerproducts.component';
import { SellerprofileComponent } from './sellerprofile/sellerprofile.component';
import { OrdersviewbysellerComponent } from './ordersviewbyseller/ordersviewbyseller.component';
import { SellerGuard } from './auth-guard/seller.guard';
import { AdminpasswordchngeComponent } from './adminpasswordchnge/adminpasswordchnge.component';
import { SellerpassqordchngComponent } from './sellerpassqordchng/sellerpassqordchng.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ViewuserComponent,
    ProfileComponent,
    RegisterComponent,
    ProductaddComponent,
    ViewallbooksComponent,
    UpdatebooksComponent,
    OrderpageComponent,
    OrdersComponent,
    ViewallorderComponent,
    AddtocartComponent,
    PagenotfoundComponent,
    AdminloginComponent,
    UpdatepasswordComponent,
    ResetpasswordComponent,
    NewpasswordComponent,
    ViewproductComponent,
    SearchbookComponent,
    SellerregisterComponent,
    SellerloginComponent,
    ViewallsellerComponent,
    SellerproductsComponent,
    SellerprofileComponent,
    OrdersviewbysellerComponent,
    AdminpasswordchngeComponent,
    SellerpassqordchngComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    ExportAsModule ,
    CloudinaryModule.forRoot(Cloudinary, environment.cloudinaryconfig),
    NgbModule,
    MdbModalModule,
    FontAwesomeModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    MdbDropdownModule

  
  ],
  providers: [Userdetails,Bookdetails,Orderdetails,Cartdetails,Admin,Otpsend,AuthGuard,AdminguardGuard,Sellerdetails,SellerGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
