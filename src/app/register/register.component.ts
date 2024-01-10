import { Component, OnInit } from '@angular/core';
import { Userdetails } from '../models/userdetails';
import { UserregserviceService } from '../services/userregservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userservice:UserregserviceService,public userobj:Userdetails) { }
  

  ngOnInit(): void {
  }

  errormsg=false;
  successmsg=false;
  onSubmit(formdata:any){
    console.log(formdata)
    this.userservice.addnewuser(this.userobj)
    .subscribe((res:any)=>{
      if(res.length==0){
        console.log("error");
        this.errormsg=true;
        this.successmsg=false;
      }
      else{
        // this.userobj.username="",
        // this.userobj.mobileno="",
        // this.userobj.useremail="",
        // this.userobj.password="",
        // this.userobj.address="",
        // this.userobj.surname="",
        formdata.resetForm();
        this.errormsg=false;
        this.successmsg=true;
        
      }
    })
   
   
  }
}
