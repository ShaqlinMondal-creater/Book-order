import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cartdetails } from '../models/cartdetails';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public httpobj:HttpClient) { }

  private readonly _url="http://localhost:5000/cart";

  addtoCart(cartobj:Cartdetails){
    let url=this._url+"/addtocart";
    return this.httpobj.post(url,cartobj);
  }

  viewCart(userId:string){
    let url=this._url+"/cartview/"+userId;
    return this.httpobj.get(url);
  }

  removeCart(cartobj:Cartdetails){
    let url=this._url+"/removecart/"+cartobj.userId+"/"+cartobj.bookId+"/";
    return this.httpobj.delete(url);
  }

  countCart(userId:string){
    let url=this._url+"/countitem/"+userId;
    return this.httpobj.get(url);
  }

  alreadycart(cartobj:Cartdetails){
    let url=this._url+"/alreadycart/"+cartobj.userId+"/"+cartobj.bookId+"/";
    return this.httpobj.get(url);
  }

}
