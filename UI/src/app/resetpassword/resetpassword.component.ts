import { Component, OnInit } from '@angular/core';
import { Otpsend } from '../models/otpsend';
import { Userdetails } from '../models/userdetails';
import { UserregserviceService } from '../services/userregservice.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NewpasswordComponent } from '../newpassword/newpassword.component';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  modalRef: MdbModalRef<NewpasswordComponent> | null = null;
  constructor(public otpobj:Otpsend,public userservice:UserregserviceService,public userobj:Userdetails,private modalService: MdbModalService) { }
  otpmsg:boolean=false
  ngOnInit(): void {
  
  }

  otpSend(){
    this.userservice.emailOtp(this.otpobj)
    .subscribe((res:any)=>{
      console.log(res);
      this.otpmsg=true;
    })
  }

  otpVerify(){
    this.userservice.otpVerify(this.otpobj)
    .subscribe((res:any)=>{
      if(res.length>0){
        console.log(res[0]);
        console.log(res[0].expireIn)
        const date=new Date().getMinutes();
        const dif=res[0].expireIn-date;
        console.log(dif)
        if(dif>0){
         console.log('Verified');
         sessionStorage.setItem('verify',JSON.stringify(res[0]))
         this.modalRef = this.modalService.open(NewpasswordComponent)
       }
      }
      
    })
  }






}
