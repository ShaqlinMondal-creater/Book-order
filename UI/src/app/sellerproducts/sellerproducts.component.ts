import { Component, OnInit } from '@angular/core';
import { ExportAsService, ExportAsConfig, SupportedExtensions} from 'ngx-export-as';
import { UpdatebooksComponent } from '../updatebooks/updatebooks.component';
import { Subject } from 'rxjs';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { BookregService } from '../services/bookreg.service';
import { Router } from '@angular/router';
import { Bookdetails } from '../models/bookdetails';
@Component({
  selector: 'app-sellerproducts',
  templateUrl: './sellerproducts.component.html',
  styleUrls: ['./sellerproducts.component.css']
})
export class SellerproductsComponent implements OnInit {
  downloadAs: SupportedExtensions = 'png';

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'viewallbook', // the id of html/table element
  };

  modalRef: MdbModalRef<UpdatebooksComponent> | null = null;
  constructor( public exportAsService: ExportAsService,public bookservice:BookregService,public router:Router,private modalService: MdbModalService,public bookobj:Bookdetails) { }
  
  allbooks:Bookdetails[]=[];
  dtOptions:DataTables.Settings={}
  dtTrigger:Subject<any>=new Subject<any>()
  ngOnInit(): void {
    this.dtOptions={
      pagingType:'numbers',
      lengthChange:false,
      ordering:false
    }
    let sellerdata=JSON.parse(sessionStorage['sellerdetails']);
    this.bookobj.sellerId=sellerdata.sellerId
  this.booksAddbySeller();

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

  booksAddbySeller(){
    this.bookservice.searchBookByseller(this.bookobj.sellerId)
    .subscribe((res:any)=>{
      if(res.length>0){
        this.allbooks=res;
        
      }
      else{
        this.dtTrigger.next(null)
        console.log("No record Found");
      }
    })
  }

  onDelete(deleteobj:any){
    this.bookservice.removeBook(deleteobj)
    .subscribe((res:any)=>{
      console.log(res);
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
    })
    })
  }

  openModal(bookobj:any) {
    this.modalRef = this.modalService.open(UpdatebooksComponent)
    sessionStorage.setItem('bookdetails',JSON.stringify(bookobj));
    
  }

}
