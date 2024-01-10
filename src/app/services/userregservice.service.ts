import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Userdetails } from '../models/userdetails';
import { Otpsend } from '../models/otpsend';
@Injectable({
  providedIn: 'root'
})
export class UserregserviceService {

  constructor(public httpobj:HttpClient) { }
  private readonly _url="http://localhost:5000/user";

  addnewuser(userobj:Userdetails){
    console.log(userobj.username);
    let url=this._url+"/register"
    return this.httpobj.post(url,userobj);
  }
  loginuser(userobj:Userdetails){
    let url=this._url+"/login";
    return this.httpobj.post(url,userobj);
  }
  viewuser(){
    let url=this._url+"/viewall";
    return this.httpobj.get(url);
  }

  searchuser(useremail:string){
    let url=this._url+"/search/"+useremail
    return this.httpobj.get(url);
  }
  deleteuser(userobj:Userdetails){
    let url=this._url+"/delete/"+userobj.userid
    return this.httpobj.delete(url);
  }
  updateuser(userobj:Userdetails){
    // let headers={
    //   'authorization':"Bearer" +sessionStorage.getItem('token')
    // }
    let url=this._url+"/update/"+userobj.userid
    // return this.httpobj.put(url,userobj,{headers:headers});
    return this.httpobj.put(url,userobj);
  }
  changepassword(userobj:Userdetails){
    let url=this._url+"/changepassword";
    return this.httpobj.put(url,userobj);
  }

  emailOtp(otpsendobj:Otpsend){
    let url=this._url+"/sendotp";
    return this.httpobj.post(url,otpsendobj);
  }

  otpVerify(otpSend:Otpsend){
    let url=this._url+"/otpverify";
    return this.httpobj.post(url,otpSend);
  }

  resetPassword(userobj:Userdetails){
    let url=this._url+"/resetpassword";
    return this.httpobj.put(url,userobj);
  }

}
