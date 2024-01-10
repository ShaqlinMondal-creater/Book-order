import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bookdetails } from '../models/bookdetails';
import { BookregService } from '../services/bookreg.service';
@Component({
  selector: 'app-searchbook',
  templateUrl: './searchbook.component.html',
  styleUrls: ['./searchbook.component.css']
})
export class SearchbookComponent implements OnInit {

  constructor(public bookservice:BookregService,public router:Router) { }
  allbook:Bookdetails[]=[]
  searchterm:string=""
  ngOnInit(): void {
    this.viewallbook();
    this.bookservice.searchbook.subscribe((value:any)=>{
      this.searchterm=value
    })
  }


  viewallbook(){
    this.bookservice.viewBooks()
    .subscribe((res:any)=>{
      if(res.length>0){
        this.allbook=res;
      }
    })
  }

  viewProduct(bookobj:any) {
    sessionStorage.setItem('viewbook', JSON.stringify(bookobj));
    this.router.navigate(['/viewproduct']);
  }
}
