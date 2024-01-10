import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerGuard } from '../auth-guard/seller.guard';
import { Sellerdetails } from '../models/sellerdetails';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-sellerlogin',
  templateUrl: './sellerlogin.component.html',
  styleUrls: ['./sellerlogin.component.css']
})
export class SellerloginComponent implements OnInit {

  constructor(public sellerobj:Sellerdetails, public sellerservice:SellerService,public router:Router,private guardobj:SellerGuard) { }
  errormsg:boolean=false
  status:boolean=false
   ngOnInit(): void {
  }

  onLogin(formdata:any){
    this.sellerservice.sellerlogin(this.sellerobj)
    .subscribe((res:any)=>{
      if(res.length>0){
        
        if(res[0].activeStatus==true){
          sessionStorage.setItem('sellerdetails',JSON.stringify(res[0]));
          formdata.resetForm();
          this.router.navigate(['/productbyseller'])
        }
        else{
          this.errormsg=false;
          this.status=true;
        }
       
      }
      else{
          this.status=false;
          this.errormsg=true;
      }
    })
  }



}
