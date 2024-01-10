import { Component, OnInit } from '@angular/core';
import { Sellerdetails } from '../models/sellerdetails';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-sellerprofile',
  templateUrl: './sellerprofile.component.html',
  styleUrls: ['./sellerprofile.component.css']
})
export class SellerprofileComponent implements OnInit {

  constructor(public sellerobj:Sellerdetails,public sellerservice:SellerService) { }
  sellerdetails:[]=[]
  file!:File
  updatemsg:boolean=false;
  ngOnInit(): void {
    let sellerdata=JSON.parse(sessionStorage['sellerdetails']);
    this.sellerobj=sellerdata;
    console.log(this.sellerdetails)
  }

  updateProfile(formdata:any){
    this.sellerservice.sellerupdate(this.sellerobj)
    .subscribe((res:any)=>{
      this.updatemsg=true
      formdata.resetForm();
    })
  }

  onUpload(event:any){
    this.file=event.target.files[0];
    if(this.file){
      this.sellerservice.upload(this.file).subscribe((result:any)=>{
          console.log(result.url);
          this.sellerobj.profile=result.url;
          console.log(this.sellerobj.profile);
      })
    }
  }

  


  // onUpload($event:any){
  // }

}
