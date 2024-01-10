import { Component, OnInit } from '@angular/core';
import { Userdetails } from '../models/userdetails';
import { UserregserviceService } from '../services/userregservice.service';
@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {

  constructor(public userobj:Userdetails,public userservice:UserregserviceService) { }
  updatemsg:boolean=false
  errormsg:boolean=false
  ngOnInit(): void {
    let obj=JSON.parse(sessionStorage["userdetails"])
    this.userobj.useremail=obj.useremail
  }

  onSubmit(){
    this.userservice.changepassword(this.userobj)
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
