import { Component, Input, OnInit, Output } from '@angular/core';
import { Userdetails } from '../models/userdetails';
import { UserregserviceService } from '../services/userregservice.service';
import { Bookdetails } from '../models/bookdetails';
import { BookregService } from '../services/bookreg.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { OrderpageComponent } from '../orderpage/orderpage.component';
import { Cartdetails } from '../models/cartdetails';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: MdbModalRef<OrderpageComponent> | null = null;
  constructor(public userservice: UserregserviceService, public userobj: Userdetails, public bookservice: BookregService, private modalService: MdbModalService, public cartobj: Cartdetails, public cartservice: CartService, public router: Router, public bookobj: Bookdetails) { }
  topbook: Bookdetails[] = []
  viewbook: Bookdetails[] = []
 
 
  ngOnInit(): void {
    this.topBooks();
    this.viewBooks();
   
  };


  viewProduct(bookobj:any) {
    sessionStorage.setItem('viewbook', JSON.stringify(bookobj));
    this.router.navigate(['/viewproduct']);
  }

  public isLogin(): boolean {
    return (sessionStorage.getItem("userdetails") != null);
  }

  topBooks() {
    this.bookservice.viewTopBook()
      .subscribe((res: any) => {
        if (res.length > 0) {
          this.topbook = res;
        }
      })
  }

  viewBooks(){
    this.bookservice.viewBooks()
    .subscribe((res:any)=>{
      if(res.length>0){
        this.viewbook=res;
      }
    })
  }
  

}
