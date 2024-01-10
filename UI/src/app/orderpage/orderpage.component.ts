import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Bookdetails } from '../models/bookdetails';
import { Orderdetails } from '../models/orderdetails';
import { Userdetails } from '../models/userdetails';
import { OrderregserviceService } from '../services/orderregservice.service';
import { CartService } from '../services/cart.service';
import { Cartdetails } from '../models/cartdetails';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orderpage',
  templateUrl: './orderpage.component.html',
  styleUrls: ['./orderpage.component.css']
})
export class OrderpageComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<OrderpageComponent>,public userobj:Userdetails,public bookobj:Bookdetails,public orderservice:OrderregserviceService,public orderobj:Orderdetails,public cartobj:Cartdetails,public cartservice:CartService,public router:Router) { }
  updatemsg:boolean=false;
  ngOnInit(): void {
    let orderplaceobj=JSON.parse(sessionStorage["userdetails"]);
    console.log(orderplaceobj);


    let bookorderobj=JSON.parse(sessionStorage["bookBuy"]);
    console.log(bookorderobj);
    this.bookobj.bookname=bookorderobj.bookname,
    this.bookobj.bookId=bookorderobj.bookId,
    this.bookobj.publisher=bookorderobj.publisher,
    this.bookobj.price=bookorderobj.price,
    this.bookobj.sideimg=bookorderobj.sideimg;


    this.orderobj.bookId=bookorderobj.bookId,
    this.orderobj.address=orderplaceobj.address,
    this.orderobj.name=orderplaceobj.username+" "+orderplaceobj.surname,
    this.orderobj.mobileno=orderplaceobj.mobileno,
    this.orderobj.userId=orderplaceobj.userid,
    this.orderobj.bookname=bookorderobj.bookname,
    this.orderobj.bookImage=bookorderobj.sideimg[0],
    this.orderobj.category=bookorderobj.category,
    this.orderobj.author=bookorderobj.author,
    this.orderobj.sellerId=bookorderobj.sellerId,
    this.orderobj.sellername=bookorderobj.sellername,
    this.orderobj.price=bookorderobj.price
    this.orderobj.publisher=bookorderobj.publisher
    this.orderobj.orderstatus="Ordered"
    this.orderobj.quantity=1

  }

  onSubmit(){
    this.orderservice.placeOrder(this.orderobj)
    .subscribe((res:any)=>{
      if(res.length==0){
        console.log("Order not Place");
      }
      else{
        this.updatemsg=true;
        this.cartservice.removeCart(res)
        .subscribe((result:any)=>{
          console.log(result);
          let currentUrl = this.router.url;
           this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
          })
          this.modalRef.close();
          alert('Order Place Successfully');
        })
      }
    })
  }

 




}
