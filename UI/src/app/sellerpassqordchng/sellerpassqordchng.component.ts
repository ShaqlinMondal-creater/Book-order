import { Component, OnInit } from '@angular/core';
import { Sellerdetails } from '../models/sellerdetails';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-sellerpassqordchng',
  templateUrl: './sellerpassqordchng.component.html',
  styleUrls: ['./sellerpassqordchng.component.css']
})
export class SellerpassqordchngComponent implements OnInit {

  constructor(public sellerobj:Sellerdetails,public sellerservice:SellerService) { }
  updatemsg:boolean=false
  errormsg:boolean=false
  ngOnInit(): void {
    let obj=JSON.parse(sessionStorage["sellerdetails"])
    this.sellerobj.selleremail=obj.selleremail
  }

  onSubmit(){
    this.sellerservice.changepassword(this.sellerobj)
    .subscribe((res:any)=>{
      if(res.length==0){
        console.log("error");
        this.errormsg=true;
        this.updatemsg=false;
      }
     else{
      console.log(res);
     this.updatemsg=true;
     this.errormsg=false;
     }
    })
  }

}
