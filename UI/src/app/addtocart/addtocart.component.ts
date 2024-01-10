import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cartdetails } from '../models/cartdetails';
import { Router } from '@angular/router';
import { Orderdetails } from '../models/orderdetails';
import { OrderregserviceService } from '../services/orderregservice.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { OrderpageComponent } from '../orderpage/orderpage.component';
import { BookregService } from '../services/bookreg.service';
@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {
  modalRef: MdbModalRef<OrderpageComponent> | null = null;
  constructor(public cartobj:Cartdetails,public cartservice:CartService,public router:Router,public orderobj:Orderdetails,public orderservice:OrderregserviceService,private modalService: MdbModalService,public bookservice:BookregService) { }
  allcart:Cartdetails[]=[];
  msg:boolean=false;
  cartdiv:boolean=false;
  ngOnInit(): void {
    let userobj=JSON.parse(sessionStorage["userdetails"]);
    console.log(userobj);
    this.cartobj.userId=userobj.userid

    this.viewCart();
  }

  viewCart(){
    this.cartservice.viewCart(this.cartobj.userId)
    .subscribe((res:any)=>{
      console.log(res);
      if(res.length>0){
        this.allcart=res;
        this.msg=false;
        this.cartdiv=true;
        localStorage.setItem('cartitem',JSON.stringify(res))
       
      }
      else{
        this.msg=true;
        this.cartdiv=false
      }
    })
  }

  removeCart(bookobj:any){
    this.cartservice.removeCart(bookobj)
    .subscribe((res:any)=>{
      console.log(res);
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
    })
    })
  }

  buyNow(bookobj:any){
    this.bookservice.searchBookByid(bookobj.bookId).subscribe((res:any)=>{
      sessionStorage.setItem('bookBuy',JSON.stringify(res[0]));
      this.modalRef = this.modalService.open(OrderpageComponent)
    })
   

  }

}
