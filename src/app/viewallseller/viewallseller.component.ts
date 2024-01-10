import { Component, OnInit } from '@angular/core';
import { ExportAsService, ExportAsConfig, SupportedExtensions} from 'ngx-export-as';
import { Subject } from 'rxjs';
import { SellerService } from '../services/seller.service';
import { Sellerdetails } from '../models/sellerdetails';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewallseller',
  templateUrl: './viewallseller.component.html',
  styleUrls: ['./viewallseller.component.css']
})
export class ViewallsellerComponent implements OnInit {
  downloadAs: SupportedExtensions = 'png';

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'usertable', // the id of html/table element
  };
  allseller:Sellerdetails[]=[]
  constructor(public exportAsService:ExportAsService, public sellerservice:SellerService,public sellerobj:Sellerdetails, public router:Router) { }
  
  dtOptions:DataTables.Settings={}
  dtTrigger:Subject<any>=new Subject<any>()


  ngOnInit(): void {
    this.dtOptions={
      pagingType:'numbers',
      lengthChange:false,
      pageLength: 10,
   
    }
    this.viewseller();
  }
  export() {
    this.exportAsConfig.type = this.downloadAs;
    this.exportAsService
      .save(this.exportAsConfig, 'Exported_File_Name')
      .subscribe(() => {
      });
   
    this.exportAsService.get(this.exportAsConfig).subscribe((content) => {
      console.log(content);
    });
  }

  viewseller(){
    this.sellerservice.viewseller()
    .subscribe((res:any)=>{
        this.allseller=res
      
    })
  }

  status(event:any,seller:any){
    console.log(event.target.checked);
    console.log(event.target.value);
    seller.activeStatus=event.target.checked
    // event.target.value.activeStatus=event.target.checked;
    this.sellerservice.sellerupdate(seller)
    .subscribe((res:any)=>{
    })
  }
  
  onDelete(deleteobj:any){
    this.sellerservice.sellerdelete(deleteobj)
    .subscribe((res:any)=>{
      console.log(res);
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
    })
    })
  }
}
