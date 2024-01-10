import { Component, OnInit } from '@angular/core';
import { Orderdetails } from '../models/orderdetails';
import { OrderregserviceService } from '../services/orderregservice.service';
import { Bookdetails } from '../models/bookdetails';
import { BookregService } from '../services/bookreg.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  allorder:Orderdetails[]=[]
  orderdiv:boolean=false;
  norecord:boolean=false;
  toDisplay = true;
  getbooks:Bookdetails[]=[]
  constructor(public orderservice:OrderregserviceService,public orderobj:Orderdetails,public bookobj:Bookdetails,public bookservice:BookregService,
    public router:Router) { }

  ngOnInit(): void {
    let orderplaceobj=JSON.parse(sessionStorage["userdetails"]);
    console.log(orderplaceobj);
    this.orderobj.userId=orderplaceobj.userid
    this.vieworders();
    
  }

  vieworders(){
    this.orderservice.viewOrder(this.orderobj.userId)
    .subscribe((res:any)=>{
      if(res.length>0){
       this.allorder=res;
       this.orderdiv=true;
       this.norecord=false;
      
      }
      else{
        this.norecord=true;
        this.orderdiv=false;
      }
    })
  }

  cancelorder(cancelobj:any){
    cancelobj.orderstatus="Cancel"
    this.orderservice.cancelOrder(cancelobj)
    .subscribe((res:any)=>{
      console.log(res);
      let currenturl=this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currenturl]);
    })
  })
}

public status(obj:any):Boolean{
  if(obj.orderstatus=="Cancel"){
    return false;
  }
  return true;
}



}
