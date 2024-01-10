import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBook, faCartPlus,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { Bookdetails } from '../models/bookdetails';
import { Cartdetails } from '../models/cartdetails';
import { BookregService } from '../services/bookreg.service';
import { CartService } from '../services/cart.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public r:Router,public cartservice:CartService,public cartobj:Cartdetails,public bookobj:Bookdetails,public bookservice:BookregService) { }
  booksearch:Bookdetails[]=[]
  noOfCart:number=0
  carticon=faCartPlus
  book=faBook
  logouticon=faSignOutAlt
  searchitem:string=""
  ngOnInit(): void {
    this.countItem();
    
  }

 public isLogin():boolean{
  return (sessionStorage.getItem("userdetails")!=null);
 }
 

 public isAdminLogin():boolean{
  return (sessionStorage.getItem("admindetails")!=null);
 }

 public isSellerLogin():boolean{
  return (sessionStorage.getItem("sellerdetails")!=null);
}

  logout(){
    sessionStorage.removeItem("userdetails");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem('bookBuy');
    sessionStorage.removeItem('admindetails');
    sessionStorage.removeItem('sellerdetails');
    sessionStorage.clear();
    this.r.navigate(['/']);
  }

  countItem(){
    if(sessionStorage.getItem("userdetails")!=null){
      let userobj=JSON.parse(sessionStorage["userdetails"]);
      console.log(userobj.userid);
      this.cartservice.countCart(userobj.userid)
      .subscribe((res:any)=>{
        console.log(res);
        this.noOfCart=res.no;
      })
    }
    else{
      this.noOfCart=0
    }
   
  }

  search(event:any){
    this.searchitem=(event.target as HTMLInputElement).value
    console.log(this.searchitem)
    this.bookservice.searchbook.next(this.searchitem)
    this.r.navigate(['/booksearch'],
    {
      queryParams: { book:this.searchitem ,filter: 'new' },
      queryParamsHandling: 'merge' }
    )
  }

 
}
