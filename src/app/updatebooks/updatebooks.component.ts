import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Bookdetails } from '../models/bookdetails';
import { BookregService } from '../services/bookreg.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Router } from '@angular/router';
@Component({
  selector: 'app-updatebooks',
  templateUrl: './updatebooks.component.html',
  styleUrls: ['./updatebooks.component.css']
})
export class UpdatebooksComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<UpdatebooksComponent>,public bookobj:Bookdetails,public bookservice:BookregService,private cloudinary: Cloudinary,public router:Router) { }
  uploader!: FileUploader;
  updatemsg:boolean=false;
  ngOnInit(): void {
    let updatebookobj=JSON.parse(sessionStorage["bookdetails"]);
    console.log(updatebookobj);
    this.bookobj.bookname=updatebookobj.bookname,
    this.bookobj.author=updatebookobj.author,
    this.bookobj.category=updatebookobj.category,
    this.bookobj.price=updatebookobj.price,
    this.bookobj.publisher=updatebookobj.publisher,
    this.bookobj.description=updatebookobj.description,
    this.bookobj.sideimg=updatebookobj.sideimg,
    this.bookobj.sideimg=updatebookobj.sideimg,
    this.bookobj.bookId=updatebookobj.bookId;

    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
    };

    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('folder', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
     
    };
  }


  onUpload(){
    this.uploader.uploadAll();
    this.uploader.response.subscribe((result:any)=>{
      this.bookobj.sideimg=JSON.parse(result).url;
      console.log(JSON.parse(result).url);
    })
  }

  onSubmit(){
    this.bookservice.updateBook(this.bookobj)
    .subscribe((res:any)=>{
      this.updatemsg=true;
      console.log(res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['productbyseller']);
    })
    localStorage.removeItem("bookdetails");

    this.bookobj.bookname="",
    this.bookobj.author="",
    this.bookobj.bookname="",
    this.bookobj.category="",
    this.bookobj.description="",
    this.bookobj.price=0,
    this.bookobj.publisher="";
   
    })
  }
}
