import { Component, Input, OnInit } from '@angular/core';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Bookdetails } from '../models/bookdetails';
import { BookregService } from '../services/bookreg.service';
import { ArrayType } from '@angular/compiler';
@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
 
  uploader!: FileUploader;
 
  singleupload!: FileUploader;
  uploadimg:boolean=false
  addmsg:boolean=false;

  previews:string[]=[];
 

  sideImage:Array<string>=[]
  constructor(
   public cloudinary: Cloudinary,
   public bookobj:Bookdetails,
   public bookservice:BookregService


  ) {}

  ngOnInit(): void {
   
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
     
    };

 

    this.uploader = new FileUploader(uploaderOptions);
    
    this.uploader.onBuildItemForm = (fileItem:any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('folder', fileItem);
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
     
    };
    let sellerdata=JSON.parse(sessionStorage['sellerdetails'])
    this.bookobj.sellerId=sellerdata.sellerId,
    this.bookobj.sellername=sellerdata.sellername
    console.log(this.bookobj.sellername)
  }


  previewimg(event:any){
    console.log(event)
    if(event.target.files){
      
        var reader=new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(e:any)=>{
          this.previews.push(e.target.result);
          console.log(this.previews);
        }
      
    }
    else{
      console.log("error");
    }
    
  }

  
  removeimg(url:any){
    console.log(url);
    let index=this.previews.indexOf(url)
    this.previews.splice(index,1);
  }
 

  uploadsideimg(){
    this.uploader.uploadAll();
    this.uploader.response.subscribe((result:any)=>{
      // this.bookobj.sideimg=JSON.parse(result).url
      // this.uploadimg=true;
      console.log(result);
      this.sideImage.push(JSON.parse(result).url)
      this.bookobj.sideimg=this.sideImage
      console.log(this.bookobj.sideimg);
    })
  }
  
  onSubmit(formdata:any){
    this.bookservice.addBook(this.bookobj)
    .subscribe((res:any)=>{
      if(res.length==0){
        console.log("Error in add book");
      }
      else{
        formdata.resetForm();
        this.previews.splice(0)
      }
    })
  }



}