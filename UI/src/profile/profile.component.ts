import { Component, OnInit } from '@angular/core';
import { Userdetails } from '../models/userdetails';
import { UserregserviceService } from '../services/userregservice.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updatemsg=false;
  uploadmsg:boolean=false;
  constructor(public userobj:Userdetails,public serviceobj:UserregserviceService,private cloudinary: Cloudinary,private http: HttpClient) { }
  uploader!: FileUploader;
  ngOnInit(): void {
    let updateobj=JSON.parse(sessionStorage["userdetails"]);
    console.log(updateobj);
    this.userobj.username=updateobj.username,
    this.userobj.userid=updateobj.userid,
    this.userobj.surname=updateobj.surname,
    this.userobj.mobileno=updateobj.mobileno,
    this.userobj.address=updateobj.address,
    this.userobj.useremail=updateobj.useremail
    this.userobj.profile=updateobj.profile

      
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

onUpload(event:any){
  this.uploader.uploadAll();
  this.uploader.response.subscribe((result:any)=>{
    this.userobj.profile=JSON.parse(result).url;
    this.uploadmsg=true;
    console.log(JSON.parse(result).url);
  })
}



  updateProfile(formdata:any){
    this.serviceobj.updateuser(this.userobj)
    .subscribe((res:any)=>{
      console.log(res);
      this.updatemsg=true;
      this.uploadmsg=false;
      formdata.resetForm()
    })
  }

}
