import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Orderdetails } from '../models/orderdetails';
@Injectable({
  providedIn: 'root'
})
export class OrderregserviceService {
  private readonly _url="http://localhost:5000/order";
  constructor(public httpobj:HttpClient) { }

  placeOrder(orderobj:Orderdetails){
    let url=this._url+"/order";
    return this.httpobj.post(url,orderobj);
  }

  cancelOrder(orderobj:Orderdetails){
    let url=this._url+"/cancelorder/"+orderobj.orderId;
    return this.httpobj.put(url,orderobj);
  }

  viewOrder(userId:string){
    let url=this._url+"/vieworder/"+userId;
    return this.httpobj.get(url);
  }

  viewallorder(){
    let url=this._url+"/viewallorder";
    return this.httpobj.get(url);
  }
  vieworderbyseller(sellerId:string){
    let url=this._url+"/vieworderbyseller/"+sellerId;
    return this.httpobj.get(url);
  }
}
