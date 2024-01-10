import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public httpobj:HttpClient) { }
  private readonly _url="http://localhost:5000/admin";

  adminRegister(adminobj:Admin){
    let url=this._url+"/adminregistration"
    return this.httpobj.post(url,adminobj)
  }

  adminLogin(adminobj:Admin){
    let url=this._url+"/adminlogin";
    return this.httpobj.post(url,adminobj);
  }
  changepassword(adminobj:Admin){
    let url=this._url+"/updatepassword";
    return this.httpobj.put(url,adminobj);
  }

}
