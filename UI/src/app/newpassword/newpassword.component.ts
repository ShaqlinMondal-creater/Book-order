import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Userdetails } from '../models/userdetails';
import { UserregserviceService } from '../services/userregservice.service';
@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<NewpasswordComponent>,public userobj:Userdetails,public userservice:UserregserviceService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('verify')!=null){
      let obj=JSON.parse(sessionStorage['verify']);
      this.userobj.useremail=obj.useremail
    }
  }

  onSubmit(){
    this.userservice.resetPassword(this.userobj)
    .subscribe((res:any)=>{
      console.log(res);
      this.modalRef.close();
      alert('Password Changed');
      
    })
    sessionStorage.removeItem('verify');
  }

}
