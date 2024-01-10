import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sellerdetails } from '../models/sellerdetails';
import { Observable } from 'rxjs';
import { Cloudinary } from '@cloudinary/angular-5.x';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private readonly _url="http://localhost:5000/seller";
  constructor(private http:HttpClient,public cloudinary: Cloudinary) { }

  sellerreg(sellerobj:Sellerdetails){
    let url=this._url+"/sellerregistration";
    return this.http.post(url,sellerobj);
  }

  sellerlogin(sellerobj:Sellerdetails){
    let url=this._url+"/sellerlogin";
    return this.http.post(url,sellerobj);
  }

  sellerupdate(sellerobj:Sellerdetails){
    let url=this._url+"/sellerupdate/"+sellerobj.sellerId;
    return this.http.put(url,sellerobj);
  }

  viewseller(){
    let url=this._url+"/viewallseller";
    return this.http.get(url);
  }

  sellerdelete(sellerobj:Sellerdetails){
    let url=this._url+"/sellerdelete/"+sellerobj.sellerId;
    return this.http.delete(url);
  }
  changepassword(sellerobj:Sellerdetails){
    let url=this._url+"/changepassword";
    return this.http.put(url,sellerobj);
  }

  //For profile image upload
  private readonly baseUrl="https://api.cloudinary.com/v1_1/dr0ezjcyy/image/upload"
  upload(file:any):Observable<any>{
    const formData=new FormData();
    formData.append('upload_preset', this.cloudinary.config().upload_preset);
    formData.append("file",file);
    return this.http.post(this.baseUrl,formData)
  }


}
