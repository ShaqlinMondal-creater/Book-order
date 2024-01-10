import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Sellerdetails } from '../models/sellerdetails';
@Component({
  selector: 'app-sellerregister',
  templateUrl: './sellerregister.component.html',
  styleUrls: ['./sellerregister.component.css']
})
export class SellerregisterComponent implements OnInit {

  constructor(public sellerobj:Sellerdetails,public sellerservice:SellerService) { }
  regsuccess:boolean=false
  errormsg:boolean=false
  sellerid:string=""
  password!:string
  file!:File
  profileurl:string="/assets/image/sellerimg.png"
  passwordmatch:boolean=true
  ngOnInit(): void {
  }

  getpassword(password:string){
    this.password=password;

  }
  checkpassword(confimpassword:string){
   if(this.password==confimpassword){
    this.passwordmatch=true;
  }
  else{
    this.passwordmatch=false;
  }
  }

  onUpload(){
    this.sellerservice.upload(this.file).subscribe((result:any)=>{
      console.log(result.url);
      this.sellerobj.profile=result.url
    })
  }

  onSubmit(formdata:any){
    console.log(formdata);
    console.log(this.sellerobj.profile);
   if(formdata.controls.password.value==formdata.controls.confirmpassword.value)
      this.sellerservice.sellerreg(this.sellerobj)
    .subscribe((res:any)=>{
      if(res.length>0){
        formdata.resetForm();
        this.profileurl="/assets/image/sellerimg.png"
        this.sellerid=res[0].sellerId
        this.regsuccess=true;
        this.errormsg=false;
      }
      else{
        this.regsuccess=false;
        this.errormsg=true;
      }
    })
    
    else{
    console.log("Error");
    }
    
  }

  
  previewImg(event:any){
    this.file=event.target.files[0];
    if(this.file){
      var reader=new FileReader();
      reader.readAsDataURL(this.file)
      reader.onload=(e:any)=>{
        this.profileurl=e.target.result;
      }
    }
  }
  
}
