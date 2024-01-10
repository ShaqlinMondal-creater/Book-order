import { Component, OnInit,ElementRef, HostListener } from '@angular/core';
import { Userdetails } from '../models/userdetails';
import { UserregserviceService } from '../services/userregservice.service';
import { Bookdetails } from '../models/bookdetails';
import { BookregService } from '../services/bookreg.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { OrderpageComponent } from '../orderpage/orderpage.component';
import { Cartdetails } from '../models/cartdetails';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { event } from 'jquery';



@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  modalRef: MdbModalRef<OrderpageComponent> | null = null;
  constructor(public userservice: UserregserviceService, public userobj: Userdetails, public bookservice: BookregService, private modalService: MdbModalService, public cartobj: Cartdetails, public cartservice: CartService, public router: Router, public bookobj: Bookdetails,public ele:ElementRef ) { }
  alreadycart = false;
  url:string=""
  ngOnInit(): void {
    let viewbookobj = JSON.parse(sessionStorage["viewbook"]);
    this.bookobj.bookname=viewbookobj.bookname,
    this.bookobj.bookId=viewbookobj.bookId,
    this.bookobj.publisher=viewbookobj.publisher,
    this.bookobj.price=viewbookobj.price,
    this.bookobj.category=viewbookobj.category,
    this.bookobj.author=viewbookobj.author,
    this.bookobj.sideimg=viewbookobj.sideimg;
    this.bookobj.sellername=viewbookobj.sellername;
    this.bookobj.sellerId=viewbookobj.sellerId
    this.url=viewbookobj.sideimg[0]
    if (sessionStorage.getItem("userdetails") != null) {
      let userobj = JSON.parse(sessionStorage["userdetails"]);
      console.log(userobj);
      this.cartobj.userId = userobj.userid
      this.cartobj.bookId = this.bookobj.bookId
      this.cartservice.alreadycart(this.cartobj)
      .subscribe((res:any)=>{
        console.log(res.length)
        if(res.length > 0)
        {
          console.log(res.length)
          this.alreadycart = true;
        }
      })
    }
  }

  public isLogin(): boolean {
    return (sessionStorage.getItem("userdetails") != null);
  }

  openModal() {
    this.modalRef = this.modalService.open(OrderpageComponent)
    sessionStorage.setItem('bookBuy', JSON.stringify(this.bookobj));

  }


  getbook(url:string){
    this.url=url;
  }

  addtoCart(){
    this.cartobj.bookId=this.bookobj.bookId,
    this.cartobj.bookname=this.bookobj.bookname,
    this.cartobj.author=this.bookobj.author,
    this.cartobj.category=this.bookobj.category,
    this.cartobj.price=this.bookobj.price,
    this.cartobj.publisher=this.bookobj.publisher,
    this.cartobj.description=this.bookobj.description,
    this.cartobj.bookImage=this.bookobj.sideimg[0]
  
    console.log( this.cartobj.bookImage)
    this.cartservice.addtoCart(this.cartobj)
    .subscribe((res:any)=>{
      console.log(res);
      let currentUrl = 'addtocart';
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
    })
   
    })


  }
}
