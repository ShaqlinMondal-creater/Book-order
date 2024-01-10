import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth-guard/auth.guard';
import { Userdetails } from '../models/userdetails';
import { UserregserviceService } from '../services/userregservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public r:Router,public userobj:Userdetails,public serviceobj:UserregserviceService,public authguardobj:AuthGuard) { }
   public errormsg=false;
   public  successmsg=false;
  ngOnInit(): void {
  }

  onLogin(formdata:any){
    this.serviceobj.loginuser(this.userobj)
    .subscribe((res:any)=>{
      console.log("RETURN BACK");
      console.log(res);
      console.log(res.length);
    
      if(res.length>0){

        console.log(res[0].username);
        sessionStorage.setItem("username",res[0].username);
        sessionStorage.setItem("userdetails",JSON.stringify(res[0]));
        this.successmsg=true;
        this.errormsg=false;

        if(this.authguardobj){
          this.r.navigate(['/']);
        }
      
        formdata.resetForm();
       
      }
      
      else{
        console.log("Not valid user");
        this.errormsg=true;
        this.successmsg=false;
        
      }
    })

  }

  

}
