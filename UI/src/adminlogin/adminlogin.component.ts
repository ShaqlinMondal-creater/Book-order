import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminguardGuard } from '../auth-guard/adminguard.guard';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(public adminobj:Admin,public adminservice:AdminService,public router:Router,public adminguard:AdminguardGuard) { }
  loginerror:boolean=false
  ngOnInit(): void {
  }

  onAdminLogin(formdata:any){
    this.adminservice.adminLogin(this.adminobj)
    .subscribe((res:any)=>{
      console.log(res.length);
      if(res.length>0){
        console.log(res);
        formdata.resetForm();
        sessionStorage.setItem("admindetails",JSON.stringify(res[0]));
        if(this.adminguard){
          this.router.navigate(['/viewuser'])
        }
      
      }
      else{
        this.loginerror=true;
      }
    })
  }
}
