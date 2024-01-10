import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Bookdetails } from '../models/bookdetails';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookregService {
  private readonly _url="http://localhost:5000/book";
  public searchbook=new BehaviorSubject<string>("");
  constructor(public httpobj:HttpClient) { }

  addBook(bookobj:Bookdetails){
    let url=this._url+"/addbook";
    return this.httpobj.post(url,bookobj);
  }
  removeBook(bookobj:Bookdetails){
    let url=this._url+"/deletebook/"+bookobj.bookId ;
    return this.httpobj.delete(url);
  }
  updateBook(bookobj:Bookdetails){
    let url=this._url+"/bookupdate/"+bookobj.bookId;
    return this.httpobj.put(url,bookobj);
  }

  searchBookByid(bookId:string){
    let url=this._url+"/searchbook/"+bookId;
    return this.httpobj.get(url);
  }
  searchBookByseller(sellerId:string){
    let url=this._url+"/searchbookbyseller/"+sellerId;
    return this.httpobj.get(url);
  }
 

  getBookdetails(bookId:string){
    let url=this._url+"/bookdetails/"+bookId;
    return this.httpobj.get(url);
  }

  viewBooks(){
    let url=this._url+"/viewbooks";
    return this.httpobj.get(url);
  }

  viewTopBook(){
    let url=this._url+"/topbook";
    return this.httpobj.get(url);
  }


  
}
