import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-adminpasswordchnge',
  templateUrl: './adminpasswordchnge.component.html',
  styleUrls: ['./adminpasswordchnge.component.css']
})
export class AdminpasswordchngeComponent implements OnInit {

  constructor(public adminobj:Admin,public adminservice:AdminService) { }
  updatemsg:boolean=false
  errormsg:boolean=false
  ngOnInit(): void {
    let obj=JSON.parse(sessionStorage["admindetails"])
    this.adminobj.adminemail=obj.adminemail;
    console.log(this.adminobj.adminemail);
    console.log(obj.adminemail);
  }

  onSubmit(){
    console.log(this.adminobj);
    this.adminservice.changepassword(this.adminobj)
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
